using System;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using System.Collections.Generic;

namespace AutoScreenClicker
{
    public partial class MainForm : Form
    {
        // Import the user32.dll to simulate mouse clicks
        [DllImport("user32.dll", CharSet = CharSet.Auto, CallingConvention = CallingConvention.StdCall)]
        public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint dwData, int dwExtraInfo);

        // Constants for mouse_event
        private const uint MOUSEEVENTF_LEFTDOWN = 0x0002;
        private const uint MOUSEEVENTF_LEFTUP = 0x0004;

        private Timer clickTimer;
        private List<ClickPosition> clickPositions = new List<ClickPosition>();
        private int currentPositionIndex = 0;
        
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

        public MainForm()
        {
            InitializeComponents();
        }

        private void InitializeComponents()
        {
            this.Text = "Auto Screen Clicker";
            this.Size = new Size(500, 400);
            this.FormBorderStyle = FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.StartPosition = FormStartPosition.CenterScreen;
            
            // Initialize click timer
            clickTimer = new Timer();
            clickTimer.Tick += ClickTimer_Tick;
            
            // Create UI elements
            Label lblCoordinates = new Label
            {
                Text = "Mouse Coordinates:",
                Location = new Point(20, 20),
                Size = new Size(120, 20)
            };
            
            TextBox txtXCoordinate = new TextBox
            {
                Location = new Point(150, 20),
                Size = new Size(60, 20),
                Text = "0"
            };
            
            Label lblX = new Label
            {
                Text = "X:",
                Location = new Point(135, 20),
                Size = new Size(20, 20)
            };
            
            Label lblY = new Label
            {
                Text = "Y:",
                Location = new Point(225, 20),
                Size = new Size(20, 20)
            };
            
            TextBox txtYCoordinate = new TextBox
            {
                Location = new Point(240, 20),
                Size = new Size(60, 20),
                Text = "0"
            };
            
            Button btnGetCurrentPosition = new Button
            {
                Text = "Get Current Position",
                Location = new Point(320, 18),
                Size = new Size(150, 23)
            };
            
            Label lblInterval = new Label
            {
                Text = "Interval (ms):",
                Location = new Point(20, 60),
                Size = new Size(120, 20)
            };
            
            TextBox txtInterval = new TextBox
            {
                Location = new Point(150, 60),
                Size = new Size(100, 20),
                Text = "1000"
            };
            
            Button btnAddPosition = new Button
            {
                Text = "Add Position",
                Location = new Point(260, 58),
                Size = new Size(100, 23)
            };
            
            ListBox lstPositions = new ListBox
            {
                Location = new Point(20, 100),
                Size = new Size(340, 150)
            };
            
            Button btnRemovePosition = new Button
            {
                Text = "Remove Selected",
                Location = new Point(370, 100),
                Size = new Size(100, 23)
            };
            
            Button btnClearPositions = new Button
            {
                Text = "Clear All",
                Location = new Point(370, 130),
                Size = new Size(100, 23)
            };
            
            Button btnMoveUp = new Button
            {
                Text = "Move Up",
                Location = new Point(370, 160),
                Size = new Size(100, 23)
            };
            
            Button btnMoveDown = new Button
            {
                Text = "Move Down",
                Location = new Point(370, 190),
                Size = new Size(100, 23)
            };
            
            Button btnStart = new Button
            {
                Text = "Start Clicking",
                Location = new Point(20, 270),
                Size = new Size(150, 30),
                BackColor = Color.LightGreen
            };
            
            Button btnStop = new Button
            {
                Text = "Stop",
                Location = new Point(180, 270),
                Size = new Size(150, 30),
                BackColor = Color.LightCoral,
                Enabled = false
            };
            
            CheckBox chkLoop = new CheckBox
            {
                Text = "Loop through positions",
                Location = new Point(340, 275),
                Size = new Size(150, 20),
                Checked = true
            };
            
            // Status strip for displaying app status
            StatusStrip statusStrip = new StatusStrip();
            ToolStripStatusLabel statusLabel = new ToolStripStatusLabel
            {
                Text = "Ready"
            };
            statusStrip.Items.Add(statusLabel);
            
            // Add components to the form
            this.Controls.Add(lblCoordinates);
            this.Controls.Add(txtXCoordinate);
            this.Controls.Add(lblX);
            this.Controls.Add(lblY);
            this.Controls.Add(txtYCoordinate);
            this.Controls.Add(btnGetCurrentPosition);
            this.Controls.Add(lblInterval);
            this.Controls.Add(txtInterval);
            this.Controls.Add(btnAddPosition);
            this.Controls.Add(lstPositions);
            this.Controls.Add(btnRemovePosition);
            this.Controls.Add(btnClearPositions);
            this.Controls.Add(btnMoveUp);
            this.Controls.Add(btnMoveDown);
            this.Controls.Add(btnStart);
            this.Controls.Add(btnStop);
            this.Controls.Add(chkLoop);
            this.Controls.Add(statusStrip);
            
            // Add event handlers
            btnGetCurrentPosition.Click += (sender, e) =>
            {
                Point cursorPos = Cursor.Position;
                txtXCoordinate.Text = cursorPos.X.ToString();
                txtYCoordinate.Text = cursorPos.Y.ToString();
            };
            
            btnAddPosition.Click += (sender, e) =>
            {
                try
                {
                    int x = int.Parse(txtXCoordinate.Text);
                    int y = int.Parse(txtYCoordinate.Text);
                    int interval = int.Parse(txtInterval.Text);
                    
                    if (interval < 100)
                    {
                        MessageBox.Show("Interval should be at least 100ms to avoid system overload.", "Warning", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                        return;
                    }
                    
                    ClickPosition position = new ClickPosition(new Point(x, y), interval);
                    clickPositions.Add(position);
                    lstPositions.Items.Add(position);
                    statusLabel.Text = "Position added.";
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Please enter valid numbers for coordinates and interval: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            };
            
            btnRemovePosition.Click += (sender, e) =>
            {
                if (lstPositions.SelectedIndex != -1)
                {
                    int index = lstPositions.SelectedIndex;
                    clickPositions.RemoveAt(index);
                    lstPositions.Items.RemoveAt(index);
                    statusLabel.Text = "Position removed.";
                }
            };
            
            btnClearPositions.Click += (sender, e) =>
            {
                clickPositions.Clear();
                lstPositions.Items.Clear();
                statusLabel.Text = "All positions cleared.";
            };
            
            btnMoveUp.Click += (sender, e) =>
            {
                int selectedIndex = lstPositions.SelectedIndex;
                if (selectedIndex > 0)
                {
                    ClickPosition temp = clickPositions[selectedIndex];
                    clickPositions.RemoveAt(selectedIndex);
                    clickPositions.Insert(selectedIndex - 1, temp);
                    
                    lstPositions.Items.RemoveAt(selectedIndex);
                    lstPositions.Items.Insert(selectedIndex - 1, temp);
                    lstPositions.SelectedIndex = selectedIndex - 1;
                }
            };
            
            btnMoveDown.Click += (sender, e) =>
            {
                int selectedIndex = lstPositions.SelectedIndex;
                if (selectedIndex != -1 && selectedIndex < clickPositions.Count - 1)
                {
                    ClickPosition temp = clickPositions[selectedIndex];
                    clickPositions.RemoveAt(selectedIndex);
                    clickPositions.Insert(selectedIndex + 1, temp);
                    
                    lstPositions.Items.RemoveAt(selectedIndex);
                    lstPositions.Items.Insert(selectedIndex + 1, temp);
                    lstPositions.SelectedIndex = selectedIndex + 1;
                }
            };
            
            btnStart.Click += (sender, e) =>
            {
                if (clickPositions.Count == 0)
                {
                    MessageBox.Show("Please add at least one position before starting.", "Warning", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    return;
                }
                
                btnStart.Enabled = false;
                btnStop.Enabled = true;
                btnAddPosition.Enabled = false;
                btnRemovePosition.Enabled = false;
                btnClearPositions.Enabled = false;
                btnMoveUp.Enabled = false;
                btnMoveDown.Enabled = false;
                
                currentPositionIndex = 0;
                statusLabel.Text = "Auto clicking started...";
                
                // Start the timer with the first position's interval
                clickTimer.Interval = clickPositions[currentPositionIndex].Interval;
                clickTimer.Start();
            };
            
            btnStop.Click += (sender, e) =>
            {
                clickTimer.Stop();
                btnStart.Enabled = true;
                btnStop.Enabled = false;
                btnAddPosition.Enabled = true;
                btnRemovePosition.Enabled = true;
                btnClearPositions.Enabled = true;
                btnMoveUp.Enabled = true;
                btnMoveDown.Enabled = true;
                statusLabel.Text = "Auto clicking stopped.";
            };
            
            // Add key event to stop the autoclicker with Escape key
            this.KeyPreview = true;
            this.KeyDown += (sender, e) =>
            {
                if (e.KeyCode == Keys.Escape && clickTimer.Enabled)
                {
                    btnStop.PerformClick();
                }
            };
        }
        
        private void ClickTimer_Tick(object sender, EventArgs e)
        {
            // Get the current position to click
            ClickPosition position = clickPositions[currentPositionIndex];
            
            // Perform click at specified coordinates
            PerformClick(position.Location.X, position.Location.Y);
            
            // Move to next position or loop back to first
            currentPositionIndex++;
            if (currentPositionIndex >= clickPositions.Count)
            {
                CheckBox chkLoop = this.Controls.OfType<CheckBox>().FirstOrDefault(c => c.Text == "Loop through positions");
                
                if (chkLoop != null && chkLoop.Checked)
                {
                    currentPositionIndex = 0;
                }
                else
                {
                    clickTimer.Stop();
                    Button btnStart = this.Controls.OfType<Button>().FirstOrDefault(b => b.Text == "Start Clicking");
                    Button btnStop = this.Controls.OfType<Button>().FirstOrDefault(b => b.Text == "Stop");
                    
                    if (btnStart != null) btnStart.Enabled = true;
                    if (btnStop != null) btnStop.Enabled = false;
                    
                    // Re-enable all controls
                    foreach (Control ctrl in this.Controls)
                    {
                        if (ctrl is Button && ctrl != btnStop)
                        {
                            ctrl.Enabled = true;
                        }
                    }
                    
                    ToolStripStatusLabel statusLabel = this.Controls.OfType<StatusStrip>().FirstOrDefault()?.Items[0] as ToolStripStatusLabel;
                    if (statusLabel != null)
                    {
                        statusLabel.Text = "Auto clicking completed.";
                    }
                    return;
                }
            }
            
            // Set the interval for the next position
            clickTimer.Interval = clickPositions[currentPositionIndex].Interval;
        }
        
        private void PerformClick(int x, int y)
        {
            // Move cursor to specified position
            Cursor.Position = new Point(x, y);
            
            // Simulate mouse click
            mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0);
            mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, 0, 0);
        }
        
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new MainForm());
        }
    }
}
