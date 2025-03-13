using System;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Collections.Generic;
using System.Threading;

namespace ConsoleAutoScreenClicker
{
    class Program
    {
        // Import user32.dll functions for mouse simulation
        [DllImport("user32.dll", CharSet = CharSet.Auto, CallingConvention = CallingConvention.StdCall)]
        public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint dwData, int dwExtraInfo);

        // Import SetCursorPos to position the cursor
        [DllImport("user32.dll")]
        [return: MarshalAs(UnmanagedType.Bool)]
        static extern bool SetCursorPos(int x, int y);

        // Import GetCursorPos to get cursor position
        [DllImport("user32.dll")]
        [return: MarshalAs(UnmanagedType.Bool)]
        static extern bool GetCursorPos(out POINT lpPoint);

        [StructLayout(LayoutKind.Sequential)]
        public struct POINT
        {
            public int X;
            public int Y;
        }

        // Constants for mouse_event
        private const uint MOUSEEVENTF_LEFTDOWN = 0x0002;
        private const uint MOUSEEVENTF_LEFTUP = 0x0004;

        // Class to store click position and timing
        public class ClickPosition
        {
            public Point Location { get; set; }
            public int Interval { get; set; } // Interval in milliseconds

            public ClickPosition(Point location, int interval)
            {
                Location = location;
                Interval = interval;
            }

            public override string ToString()
            {
                return $"Position: X={Location.X}, Y={Location.Y} | Interval: {Interval}ms";
            }
        }

        static List<ClickPosition> clickPositions = new List<ClickPosition>();
        static bool isRunning = false;
        static bool shouldLoop = true;
        static CancellationTokenSource cts = new CancellationTokenSource();

        static void Main(string[] args)
        {
            Console.Title = "Console Auto Screen Clicker";
            Console.WriteLine("=== Console Auto Screen Clicker ===");
            Console.WriteLine("Press Ctrl+C at any time to exit the program.");

            // Set up console cancellation
            Console.CancelKeyPress += (sender, e) => {
                e.Cancel = true;
                isRunning = false;
                cts.Cancel();
                Console.WriteLine("Exiting program...");
                Environment.Exit(0);
            };

            while (true)
            {
                ShowMenu();
                string choice = Console.ReadLine();

                switch (choice)
                {
                    case "1":
                        AddPosition();
                        break;
                    case "2":
                        GetCurrentPosition();
                        break;
                    case "3":
                        ListPositions();
                        break;
                    case "4":
                        RemovePosition();
                        break;
                    case "5":
                        ClearPositions();
                        break;
                    case "6":
                        ToggleLoop();
                        break;
                    case "7":
                        StartClicking();
                        break;
                    case "8":
                        Console.WriteLine("Exiting program...");
                        return;
                    default:
                        Console.WriteLine("Invalid option. Please try again.");
                        break;
                }
            }
        }

        static void ShowMenu()
        {
            Console.WriteLine("\nMenu Options:");
            Console.WriteLine("1. Add click position");
            Console.WriteLine("2. Get current cursor position");
            Console.WriteLine("3. List all positions");
            Console.WriteLine("4. Remove a position");
            Console.WriteLine("5. Clear all positions");
            Console.WriteLine($"6. Toggle loop mode (currently: {(shouldLoop ? "ON" : "OFF")})");
            Console.WriteLine("7. Start clicking sequence");
            Console.WriteLine("8. Exit");
            Console.Write("Select an option: ");
        }

        static void AddPosition()
        {
            try
            {
                Console.Write("Enter X coordinate: ");
                int x = int.Parse(Console.ReadLine());
                
                Console.Write("Enter Y coordinate: ");
                int y = int.Parse(Console.ReadLine());
                
                Console.Write("Enter interval in milliseconds (minimum 100): ");
                int interval = int.Parse(Console.ReadLine());
                
                if (interval < 100)
                {
                    Console.WriteLine("Interval should be at least 100ms to avoid system overload.");
                    return;
                }
                
                ClickPosition position = new ClickPosition(new Point(x, y), interval);
                clickPositions.Add(position);
                Console.WriteLine("Position added successfully.");
            }
            catch (FormatException)
            {
                Console.WriteLine("Invalid input. Please enter numbers only.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }

        static void GetCurrentPosition()
        {
            if (GetCursorPos(out POINT point))
            {
                Console.WriteLine($"Current cursor position: X={point.X}, Y={point.Y}");
                
                Console.Write("Do you want to add this position? (y/n): ");
                string response = Console.ReadLine().ToLower();
                
                if (response == "y" || response == "yes")
                {
                    Console.Write("Enter interval in milliseconds (minimum 100): ");
                    if (int.TryParse(Console.ReadLine(), out int interval) && interval >= 100)
                    {
                        ClickPosition position = new ClickPosition(new Point(point.X, point.Y), interval);
                        clickPositions.Add(position);
                        Console.WriteLine("Position added successfully.");
                    }
                    else
                    {
                        Console.WriteLine("Invalid interval. Position not added.");
                    }
                }
            }
            else
            {
                Console.WriteLine("Failed to get cursor position.");
            }
        }

        static void ListPositions()
        {
            if (clickPositions.Count == 0)
            {
                Console.WriteLine("No positions have been added yet.");
                return;
            }
            
            Console.WriteLine("\nCurrent Click Positions:");
            Console.WriteLine("------------------------");
            
            for (int i = 0; i < clickPositions.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {clickPositions[i]}");
            }
        }

        static void RemovePosition()
        {
            ListPositions();
            
            if (clickPositions.Count == 0)
                return;
            
            Console.Write("\nEnter the number of the position to remove (1-" + clickPositions.Count + "): ");
            
            if (int.TryParse(Console.ReadLine(), out int index) && 
                index >= 1 && 
                index <= clickPositions.Count)
            {
                clickPositions.RemoveAt(index - 1);
                Console.WriteLine("Position removed successfully.");
            }
            else
            {
                Console.WriteLine("Invalid position number.");
            }
        }

        static void ClearPositions()
        {
            clickPositions.Clear();
            Console.WriteLine("All positions cleared.");
        }

        static void ToggleLoop()
        {
            shouldLoop = !shouldLoop;
            Console.WriteLine($"Loop mode is now {(shouldLoop ? "ON" : "OFF")}");
        }

        static void StartClicking()
        {
            if (clickPositions.Count == 0)
            {
                Console.WriteLine("Please add at least one position before starting.");
                return;
            }
            
            Console.WriteLine("Starting auto-clicking sequence...");
            Console.WriteLine("Press any key to stop.");
            
            isRunning = true;
            cts = new CancellationTokenSource();
            
            // Start clicking in a separate thread
            Thread clickingThread = new Thread(() => ClickingSequence(cts.Token));
            clickingThread.Start();
            
            // Wait for user to press any key
            Console.ReadKey(true);
            
            // Stop the clicking sequence
            isRunning = false;
            cts.Cancel();
            Console.WriteLine("Auto-clicking stopped.");
        }

        static void ClickingSequence(CancellationToken cancellationToken)
        {
            int currentPositionIndex = 0;
            
            try
            {
                while (isRunning && !cancellationToken.IsCancellationRequested)
                {
                    // Get the current position to click
                    ClickPosition position = clickPositions[currentPositionIndex];
                    
                    // Perform click at specified coordinates
                    PerformClick(position.Location.X, position.Location.Y);
                    Console.WriteLine($"Clicked at X={position.Location.X}, Y={position.Location.Y}");
                    
                    // Move to next position or loop back to first
                    currentPositionIndex++;
                    if (currentPositionIndex >= clickPositions.Count)
                    {
                        if (shouldLoop)
                        {
                            currentPositionIndex = 0;
                        }
                        else
                        {
                            Console.WriteLine("Clicking sequence completed.");
                            isRunning = false;
                            break;
                        }
                    }
                    
                    // Wait for the specified interval
                    Thread.Sleep(position.Interval);
                }
            }
            catch (OperationCanceledException)
            {
                // This is expected when cancellation is requested
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in clicking sequence: {ex.Message}");
            }
        }

        static void PerformClick(int x, int y)
        {
            // Move cursor to specified position using Windows API
            SetCursorPos(x, y);
            
            // Simulate mouse click
            mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0);
            mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, 0, 0);
        }
    }
}
