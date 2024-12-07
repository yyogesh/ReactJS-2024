/* eslint-disable max-statements, no-magic-numbers */
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import GetAppIcon from "@material-ui/icons/GetApp";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import FileCopy from "@material-ui/icons/FileCopy";
import ExpandMoreRounded from "@material-ui/icons/ExpandMoreRounded";
import AgGridWrapper from "../../../../../shared/components/AgGridWrapper";
import SearchBox from "../../../../../shared/components/SearchBox";
import { useTracking } from "react-tracking";
import { fetchPromosByOfferId } from "../../api-services";
import { fetchItemDataForValidOfferFromIqs } from "../../shared";
import { determineTableHeight } from "../../utilities";
import { columnDefs } from "./columnDefs";

import makeStyle from "./style.js";


const BATCH_COUNT = 5;
const defaultRowsPerPage = 10;
const rowHeight = 60;
const detailRowAutoHeight = true;
const defaultColDef = {
  flex: 1,
  minWidth: 200,
  filter: true,
  resizable: true,
  sortable: true
};

const MarketplacePromotions = () => {
  const [gridApi, setGridApi] = useState();
  const [columnApi, setColumnApi] = useState();
  const [results, setResults] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [errState, setErrState] = useState(false);
  const [fetchedIds, setFetchedIds] = useState([]);
  const [idsToFetch, setIdsToFetch] = useState([]);
  const [fetchingComplete, setFetchingComplete] = useState(true);
  const [fetchProgress, setFetchProgress] = useState(0);
  const [erroredIds, setErroredIds] = useState([]);
  const tracking = useTracking();
  const style = makeStyle();

  const hidden = ["id", "itemId", "itemIdList", "itemNbrs", "wupc", "gtin"];

  const tableHeight = determineTableHeight(
    results.length,
    defaultRowsPerPage,
    rowHeight
  );

  const onGridReady = params => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
    params.api.paginationSetPageSize(rowsPerPage);
  };

  const onPageSizeChanged = event => {
    setRowsPerPage(event.target.value);
    gridApi.paginationSetPageSize(event.target.value);
  };

  const handleClose = () => {
    setErrState(false);
  };

  const sortByOfferIdThenStartTime = () => {
    columnApi.applyColumnState({
      state: [
        { colId: "offerId", sort: "asc", sortIndex: 0 },
        { colId: "startTime", sort: "asc", sortIndex: 1 }
      ],
      defaultState: { sort: null }
    });
  };

  const fetchData = async () => {
    if (!idsToFetch || (Array.isArray(idsToFetch) && idsToFetch.length === 0)) {
      setFetchingComplete(true);
      return;
    }
    setFetchingComplete(false);
    let fetchedData = [];
    const offerIdsWithNoData = new Set();
    const currBacthOfIds = idsToFetch.slice(0, BATCH_COUNT);
    const remainingIds = idsToFetch.slice(BATCH_COUNT);
    // Fetch promo data
    for (const id of currBacthOfIds) {
      try {
        const data = await fetchPromosByOfferId([id]);
        if (data.length === 0) {
          offerIdsWithNoData.add(id);
        } else {
          fetchedData = [...fetchedData, ...data];
        }
      } catch (error) {
        window.console.error(error);
        offerIdsWithNoData.add(id);
      }
    }

    // Get item name for the offer ids
    const currOfferIdBatchStr = currBacthOfIds.join(" ");

    try {
      const itemData = await fetchItemDataForValidOfferFromIqs(currOfferIdBatchStr);
      const offerIdToItemDataMap = itemData.reduce((map, d) => {
        map[d.offerId] = d;
        return map;
      }, {});

      // assign itemId and itemName to recently fetched data
      fetchedData.forEach(promo => {
        const itemD = offerIdToItemDataMap[promo.offerId];
        promo.itemId = itemD.itemId;
        promo.itemName = itemD.productName;
      });
    } catch (error) {
      window.console.error("Error fetching item data: ", currOfferIdBatchStr);
      window.console.error(error);
    }

    setIdsToFetch(remainingIds);
    setFetchedIds(prevFetchedIds => {
      return [...prevFetchedIds, ...currBacthOfIds];
    });
    setResults(prevResults => {
      return [...prevResults, ...fetchedData];
    });
    setErroredIds(prevErroredIds => {
      return [...prevErroredIds, ...(Array.from(offerIdsWithNoData))];
    });
    setFetchProgress(() => {
      const fetchedSoFar = fetchedIds.length + currBacthOfIds.length;
      const totalToFetch = fetchedIds.length + currBacthOfIds.length + remainingIds.length;
      const percentageComplete = 100 * (fetchedSoFar / totalToFetch);
      return fetchedSoFar === totalToFetch ? 0 : percentageComplete;
    });
    setFetchingComplete(remainingIds.length === 0);
  };

  const onBtnExportDataAsCsv = () =>
    gridApi.exportDataAsCsv({
      allColumns: true,
      fileName: "promotions.csv",
      processCellCallback: params => {
        let res = "";
        switch (params.column.colId) {
          case "promoPrice":
            res = params?.node?.data?.currentPrice;
            break;
          case "comparisonPrice":
            res = params?.node?.data?.comparisonPrice;
            break;
          case "promoDisplayCodes":
            try {
              res = Object.entries(params.value).map(entry => entry.join(":")).join(",");
            } catch (error) {
              window.console.error("could not parse promoDisplayCodes: ", params.value);
              window.console.error(error);
            }
            break;
          default:
            res = params.value;
        }
        return res;
      }
    });

  const copyErrorsToClipboard = () => window?.navigator?.clipboard?.writeText(erroredIds.join(" "));

  const handleSearchClick = async searchString => {
    setResults([]);
    setFetchedIds([]);
    setFetchingComplete(true);
    setFetchProgress(0);
    setErroredIds([]);
    setErrState(false);
    searchString = searchString.trim();
    let offerIdList = searchString
      .replace(/"/g, "")
      .replace(/\s+/g, ", ")
      .split(",")
      .map(offerId => offerId.trim());

    const uniqueIdSet = new Set(offerIdList);
    offerIdList = Array.from(uniqueIdSet);

    if (offerIdList.length === 0) {
      setErrState(true);
      return;
    }

    if (offerIdList.length > 0) {
      tracking.trackEvent({page: "PR - MP ", action: " Promotions - Search"});
      offerIdList.sort();
      setIdsToFetch(offerIdList);
    }
  };

  useEffect(() => {
    tracking.trackEvent({page: "PR - MP ", action: " Marketplace App Promotions - View"});
  }, []);

  useEffect(() => {
    fetchData();
  }, [idsToFetch]);

  return (
    <div className={style.MarketplacePromotions}>
      <Snackbar
        anchorOrigin={{vertical: "top", horizontal: "center"}}
        open={errState}
        onClose={handleClose}
        autoHideDuration={6000}>
        <Alert onClose={handleClose} severity="error" sx={{width: "100%"}}>
          Invalid/Unsupported search
        </Alert>
      </Snackbar>
      <SearchBox
        defaultType="offerId"
        onSearch={handleSearchClick}
        hidden={hidden}
      />
      {
        !fetchingComplete &&
        (
          <Box display="flex" alignItems="center" justifyContent="center" marginTop={10}>
            <Box width="30%" mr={1}>
              <LinearProgress variant="determinate" value={fetchProgress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${Math.round(
                fetchProgress
              )}%`}</Typography>
            </Box>
          </Box>
        )
      }
      {
        fetchingComplete && erroredIds.length > 0 &&
        (
          <Box className="error-messages" marginTop={5} width="30%">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreRounded />}
              >
                <ErrorOutline style={{ color: "red" }} /> &nbsp;
                <Typography color="error">
                  Promotions for the following Offer ID(s) could not be found:
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{justifyContent: "space-between"}}>
                <ul>
                  { erroredIds.map((id, idx) => <li key={idx}>{id}</li>) }
                </ul>
                <div style={{height: "max-content"}}>
                  <Button
                    color="primary"
                    onClick={copyErrorsToClipboard}>
                      <FileCopy />
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          </Box>
        )
      }
      <div className="promo-table">
        <Grid container className="promo-table-header" justifyContent="space-between">
          <Grid item xs={11}>
            <div>
              <span className={"MuiTypography-h6"}>Promotions By Offer ID - &nbsp;</span>
              <span className="pageSizeMenuTitle">Page Size:&nbsp;</span>
              <select
                onChange={onPageSizeChanged}
                className="pageSizeMenu"
                value={rowsPerPage}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="40">40</option>
              </select>
            </div>
            { (columnApi && fetchingComplete && results.length) ? (
              <Button
                variant="text"
                color="primary"
                onClick={sortByOfferIdThenStartTime}>
                Reset Sort
              </Button>
            ) : null}
          </Grid>
          <Grid item xs={1}>
            {results.length > 0 && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<GetAppIcon />}
                onClick={onBtnExportDataAsCsv}>
                Export
              </Button>
            )}
          </Grid>
        </Grid>
        <AgGridWrapper
          rowData={results}
          columnDefs={columnDefs}
          height={tableHeight}
          detailRowAutoHeight={detailRowAutoHeight}
          defaultColDef={defaultColDef}
          suppressExcelExport={false}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

MarketplacePromotions.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

export default MarketplacePromotions;
