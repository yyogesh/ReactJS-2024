import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useTracking } from 'react-tracking';
import MarketplacePromotions from './index';

jest.mock('react-tracking');
jest.mock('../../api-services');
jest.mock('../../shared');
jest.mock('../../utilities');

describe('MarketplacePromotions', () => {
    it('should display an error message when an invalid search is performed', async () => {
        const { getByRole, getByText } = render(<MarketplacePromotions />);
        
        const searchBox = getByRole('textbox');
        const searchButton = getByRole('button', { name: /search/i });
      
        fireEvent.change(searchBox, { target: { value: '' } });
        fireEvent.click(searchButton);
      
        await waitFor(() => {
          expect(getByText('Invalid/Unsupported search')).toBeInTheDocument();
        });
      });

      it('should correctly fetch and display promotions for a single valid offer ID', async () => {
        const mockPromoData = [{ offerId: '123', promoType: 'ROLLBACK' }];
        const mockItemData = [{ offerId: '123', itemId: 'item123', productName: 'Test Product' }];
        
        jest.spyOn(apiServices, 'fetchPromosByOfferId').mockResolvedValue(mockPromoData);
        jest.spyOn(shared, 'fetchItemDataForValidOfferFromIqs').mockResolvedValue(mockItemData);
        
        const { getByRole, getByText, queryByText } = render(<MarketplacePromotions />);
        
        const searchBox = getByRole('textbox');
        const searchButton = getByRole('button', { name: /search/i });
      
        fireEvent.change(searchBox, { target: { value: '123' } });
        fireEvent.click(searchButton);
      
        await waitFor(() => {
          expect(apiServices.fetchPromosByOfferId).toHaveBeenCalledWith(['123']);
          expect(shared.fetchItemDataForValidOfferFromIqs).toHaveBeenCalledWith('123');
          expect(getByText('Test Product')).toBeInTheDocument();
          expect(getByText('ROLLBACK')).toBeInTheDocument();
          expect(queryByText('Invalid/Unsupported search')).not.toBeInTheDocument();
        });
      });

      it('should handle multiple offer IDs in a single search query', async () => {
        const mockPromoData1 = [{ offerId: '123', promoType: 'ROLLBACK' }];
        const mockPromoData2 = [{ offerId: '456', promoType: 'CLEARANCE' }];
        const mockItemData = [
          { offerId: '123', itemId: 'item123', productName: 'Test Product 1' },
          { offerId: '456', itemId: 'item456', productName: 'Test Product 2' }
        ];
      
        jest.spyOn(apiServices, 'fetchPromosByOfferId')
          .mockResolvedValueOnce(mockPromoData1)
          .mockResolvedValueOnce(mockPromoData2);
        jest.spyOn(shared, 'fetchItemDataForValidOfferFromIqs').mockResolvedValue(mockItemData);
      
        const { getByRole, getByText, queryByText } = render(<MarketplacePromotions />);
      
        const searchBox = getByRole('textbox');
        const searchButton = getByRole('button', { name: /search/i });
      
        fireEvent.change(searchBox, { target: { value: '123, 456' } });
        fireEvent.click(searchButton);
      
        await waitFor(() => {
          expect(apiServices.fetchPromosByOfferId).toHaveBeenCalledTimes(2);
          expect(apiServices.fetchPromosByOfferId).toHaveBeenCalledWith(['123']);
          expect(apiServices.fetchPromosByOfferId).toHaveBeenCalledWith(['456']);
          expect(shared.fetchItemDataForValidOfferFromIqs).toHaveBeenCalledWith('123 456');
          expect(getByText('Test Product 1')).toBeInTheDocument();
          expect(getByText('ROLLBACK')).toBeInTheDocument();
          expect(getByText('Test Product 2')).toBeInTheDocument();
          expect(getByText('CLEARANCE')).toBeInTheDocument();
          expect(queryByText('Invalid/Unsupported search')).not.toBeInTheDocument();
        });
      });

      it('should update the progress bar accurately during data fetching', async () => {
        const mockPromoData = [{ offerId: '123', promoType: 'ROLLBACK' }];
        const mockItemData = [{ offerId: '123', itemId: 'item123', productName: 'Test Product' }];
      
        jest.spyOn(apiServices, 'fetchPromosByOfferId').mockResolvedValue(mockPromoData);
        jest.spyOn(shared, 'fetchItemDataForValidOfferFromIqs').mockResolvedValue(mockItemData);
      
        const { getByRole, getByText, queryByText } = render(<MarketplacePromotions />);
      
        const searchBox = getByRole('textbox');
        const searchButton = getByRole('button', { name: /search/i });
      
        fireEvent.change(searchBox, { target: { value: '123 456 789' } });
        fireEvent.click(searchButton);
      
        await waitFor(() => {
          expect(getByText('33%')).toBeInTheDocument();
        });
      
        await waitFor(() => {
          expect(getByText('66%')).toBeInTheDocument();
        });
      
        await waitFor(() => {
          expect(queryByText(/\d+%/)).not.toBeInTheDocument();
        });
      
        expect(apiServices.fetchPromosByOfferId).toHaveBeenCalledTimes(3);
        expect(shared.fetchItemDataForValidOfferFromIqs).toHaveBeenCalledTimes(3);
      });

      it('should export data as CSV with correct formatting for special fields', async () => {
        const mockGridApi = {
          exportDataAsCsv: jest.fn()
        };
        const mockData = [
          { offerId: '123', promoPrice: 10, comparisonPrice: 15, promoDisplayCodes: { code1: 'value1', code2: 'value2' } },
          { offerId: '456', promoPrice: 20, comparisonPrice: 25, promoDisplayCodes: { code3: 'value3' } }
        ];
      
        render(<MarketplacePromotions />);
        const component = screen.getByTestId('marketplace-promotions');
        
        // Simulate grid ready event
        const onGridReady = component.props.onGridReady;
        onGridReady({ api: mockGridApi });
      
        // Set mock results
        act(() => {
          component.props.setResults(mockData);
        });
      
        // Trigger export
        const exportButton = screen.getByText('Export');
        fireEvent.click(exportButton);
      
        expect(mockGridApi.exportDataAsCsv).toHaveBeenCalledWith({
          allColumns: true,
          fileName: 'promotions.csv',
          processCellCallback: expect.any(Function)
        });
      
        // Test processCellCallback for special fields
        const processCellCallback = mockGridApi.exportDataAsCsv.mock.calls[0][0].processCellCallback;
      
        expect(processCellCallback({ column: { colId: 'promoPrice' }, node: { data: { currentPrice: 10 } } })).toBe(10);
        expect(processCellCallback({ column: { colId: 'comparisonPrice' }, node: { data: { comparisonPrice: 15 } } })).toBe(15);
        expect(processCellCallback({ column: { colId: 'promoDisplayCodes' }, value: { code1: 'value1', code2: 'value2' } })).toBe('code1:value1,code2:value2');
        expect(processCellCallback({ column: { colId: 'otherField' }, value: 'someValue' })).toBe('someValue');
      });


      it('should reset sort order when "Reset Sort" button is clicked', async () => {
        const mockApplyColumnState = jest.fn();
        const mockColumnApi = { applyColumnState: mockApplyColumnState };
        
        const { getByText } = render(<MarketplacePromotions />);
        
        // Set initial state to simulate data being loaded and sort applied
        await act(async () => {
          useStateSpies.setColumnApi(mockColumnApi);
          useStateSpies.setResults([{ id: 1 }]);
          useStateSpies.setFetchingComplete(true);
        });
      
        const resetSortButton = getByText('Reset Sort');
        expect(resetSortButton).toBeInTheDocument();
      
        fireEvent.click(resetSortButton);
      
        expect(mockApplyColumnState).toHaveBeenCalledWith({
          state: [
            { colId: "offerId", sort: "asc", sortIndex: 0 },
            { colId: "startTime", sort: "asc", sortIndex: 1 }
          ],
          defaultState: { sort: null }
        });
      });

      it('should update page size correctly when a new option is selected', () => {
        const { getByRole } = render(<MarketplacePromotions />);
        
        const pageSizeSelect = getByRole('combobox');
        const mockGridApi = { paginationSetPageSize: jest.fn() };
        
        // Simulate onGridReady to set the gridApi
        act(() => {
          onGridReady({ api: mockGridApi });
        });
        
        // Change the page size to 20
        fireEvent.change(pageSizeSelect, { target: { value: '20' } });
        
        expect(mockGridApi.paginationSetPageSize).toHaveBeenCalledWith('20');
      });

      it('should display error messages for offer IDs that couldn\'t be found', async () => {
        const mockPromoData = [{ offerId: '123', promoType: 'ROLLBACK' }];
        const mockItemData = [{ offerId: '123', itemId: 'item123', productName: 'Test Product' }];
        
        jest.spyOn(apiServices, 'fetchPromosByOfferId')
          .mockResolvedValueOnce(mockPromoData)
          .mockResolvedValueOnce([]);
        jest.spyOn(shared, 'fetchItemDataForValidOfferFromIqs').mockResolvedValue(mockItemData);
        
        const { getByRole, getByText, queryByText } = render(<MarketplacePromotions />);
        
        const searchBox = getByRole('textbox');
        const searchButton = getByRole('button', { name: /search/i });
      
        fireEvent.change(searchBox, { target: { value: '123 456' } });
        fireEvent.click(searchButton);
      
        await waitFor(() => {
          expect(apiServices.fetchPromosByOfferId).toHaveBeenCalledTimes(2);
          expect(apiServices.fetchPromosByOfferId).toHaveBeenCalledWith(['123']);
          expect(apiServices.fetchPromosByOfferId).toHaveBeenCalledWith(['456']);
          expect(shared.fetchItemDataForValidOfferFromIqs).toHaveBeenCalledWith('123 456');
          expect(getByText('Test Product')).toBeInTheDocument();
          expect(getByText('ROLLBACK')).toBeInTheDocument();
          expect(getByText('Promotions for the following Offer ID(s) could not be found:')).toBeInTheDocument();
          expect(getByText('456')).toBeInTheDocument();
          expect(queryByText('123')).not.toBeInTheDocument();
        });
      });


    it('should allow copying of errored offer IDs to clipboard', async () => {
      const mockWriteText = jest.fn();
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText,
        },
      });
    
      const { getByRole, getByText } = render(<MarketplacePromotions />);
      
      // Simulate a search with some errored offer IDs
      const searchBox = getByRole('textbox');
      const searchButton = getByRole('button', { name: /search/i });
      fireEvent.change(searchBox, { target: { value: '123 456 789' } });
      fireEvent.click(searchButton);
    
      // Mock the API calls to return some errored IDs
      jest.spyOn(apiServices, 'fetchPromosByOfferId').mockImplementation((ids) => {
        if (ids.includes('456') || ids.includes('789')) {
          return Promise.resolve([]);
        }
        return Promise.resolve([{ offerId: ids[0], promoType: 'ROLLBACK' }]);
      });
    
      // Wait for the error message to appear
      await waitFor(() => {
        expect(getByText('Promotions for the following Offer ID(s) could not be found:')).toBeInTheDocument();
      });
    
      // Click the copy button
      const copyButton = getByRole('button', { name: '' }); // The FileCopy icon button
      fireEvent.click(copyButton);
    
      // Check if the clipboard.writeText was called with the correct errored IDs
      expect(mockWriteText).toHaveBeenCalledWith('456 789');
    });  

    it('should track events correctly for viewing and searching promotions', async () => {
      const mockTracking = { trackEvent: jest.fn() };
      useTracking.mockReturnValue(mockTracking);
    
      render(<MarketplacePromotions />);
    
      // Verify that the view event is tracked on component mount
      expect(mockTracking.trackEvent).toHaveBeenCalledWith({
        page: "PR - MP ",
        action: " Marketplace App Promotions - View"
      });
    
      // Simulate a search
      const searchBox = screen.getByRole('textbox');
      const searchButton = screen.getByRole('button', { name: /search/i });
    
      fireEvent.change(searchBox, { target: { value: '123' } });
      fireEvent.click(searchButton);
    
      // Verify that the search event is tracked
      await waitFor(() => {
        expect(mockTracking.trackEvent).toHaveBeenCalledWith({
          page: "PR - MP ",
          action: " Promotions - Search"
        });
      });
    
      // Verify that trackEvent was called exactly twice
      expect(mockTracking.trackEvent).toHaveBeenCalledTimes(2);
    });
});
