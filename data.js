// Clean Saudi Music Database - Server-side functions only
const CACHE_DURATION = 300;

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Saudi Music Community Database')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Data functions - NO LINK PROCESSING ON SERVER SIDE
function getSheetData(sheetName) {
  const cache = CacheService.getScriptCache();
  const cacheKey = 'sheet_data_' + sheetName;
  
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    
    if (!sheet) {
      return [];
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      return [];
    }
    
    // Return raw data without any link processing
    const data = sheet.getRange(2, 1, lastRow - 1, 8).getValues()
      .filter(row => row[0] && String(row[0]).trim() !== '');
    
    cache.put(cacheKey, JSON.stringify(data), CACHE_DURATION);
    
    return data;
    
  } catch (error) {
    console.error('Error in getSheetData:', error);
    return [];
  }
}

// Enhanced search with partial word matching
function searchArtists(filters) {
  try {
    const data = getSheetData('Saudi music community');
    
    const hasFilters = filters && 
                      Array.isArray(filters) && 
                      filters.length > 0 && 
                      filters.some(filter => {
                        const trimmed = String(filter || '').trim();
                        return trimmed !== '';
                      });
    
    if (!hasFilters) {
      return data;
    }
    
    const filtered = data.filter(row => {
      return filters.every((filter, index) => {
        const trimmedFilter = String(filter || '').trim();
        
        if (trimmedFilter === '') {
          return true;
        }
        
        const cellValue = String(row[index] || '').toLowerCase();
        const filterValue = trimmedFilter.toLowerCase();
        
        // Enhanced partial word matching
        // Split the search term into words and check if all words are found in the cell
        const searchWords = filterValue.split(/\s+/).filter(word => word.length > 0);
        
        return searchWords.every(searchWord => {
          return cellValue.includes(searchWord);
        });
      });
    });
    
    return filtered;
    
  } catch (error) {
    console.error('Error in searchArtists:', error);
    return [];
  }
}

function getAllArtists() {
  return getSheetData('Saudi music community');
}

function getAllOpportunities() {
  return getSheetData('Opportunities for YOU');
}
