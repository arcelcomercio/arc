import { GS_EMAIL_CLIENT, GS_PRIVATE_KEY } from 'fusion:environment'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { slugify } from '../../components/utilities/parse/slugify'

const clientEmail = GS_EMAIL_CLIENT
const privateKey = GS_PRIVATE_KEY

/**
 * @param  {import('google-spreadsheet').GoogleSpreadsheetWorksheet} sheet
 */
const getInfectedData = sheet => {
  const processDataByColumn = (sheetData, currentCols = 2) => {
    const data = {}
    data.infected_by_date = []
    for (let x = 0; x < sheetData.rowCount; x++) {
      if (x >= 6) {
        data.infected_by_date.push({
          date: sheetData.getCell(x, 0).value,
          infected: sheetData.getCell(x, currentCols - 1).value,
        })
      } else {
        data[sheetData.getCell(x, 0).value] = sheetData.getCell(
          x,
          currentCols - 1
        ).value
      }

      if (x === 1) {
        data.dist_prov_slug = slugify(
          sheetData.getCell(x, currentCols - 1).value
        )
      }
    }
    return data
  }
  const result = []
  const initCol = 2 // Posición de la 1ra columna que tiene los valores a obtener
  for (let col = initCol; col <= sheet.columnCount; col++) {
    result.push(processDataByColumn(sheet, col))
  }
  return result
}

/**
 * @param  {import('google-spreadsheet').GoogleSpreadsheetWorksheet} sheet
 * @description Obtiene un Array de Objetos, siendo las columnas keys del objeto
 */
const getRowsWithColsAsKeys = sheet => {
  const result = []
  for (let row = 1; row < sheet.rowCount; row++) {
    const item = {}
    for (let col = 0; col < sheet.columnCount; col++) {
      item[sheet.getCell(0, col).value] = sheet.getCell(row, col).value
    }
    result.push(item)
  }
  return result
}

/**
 * @param  {import('google-spreadsheet').GoogleSpreadsheetWorksheet} sheet
 */
const getHomeData = sheet => {
  const result = {}
  for (let row = 0; row < sheet.rowCount; row++) {
    result[sheet.getCell(row, 0).value] = sheet.getCell(row, 1).value
  }
  return result
}

const params = [
  {
    name: 'id',
    displayName: 'ID del spreadsheet',
    type: 'text',
  },
  {
    name: 'title',
    displayName: 'Nombre de la hoja de cálculo a procesar',
    type: 'text',
  },
]

/**
 * @param  {Object} params
 * @param  {string} params.id
 * @param  {('Home'|'Contagiados Lima API'|'Contagiados Nacional API'|'Camas UCI'|'Mas Informacion')} params.title
 */
const fetch = async ({ id, title }) => {
  const spreadSheetId = id || '1iiD19aWkh4UndPnqLVysDs45Xr0BE4Waupa-d1VVlQg'
  const titleSheet = title || 'Contagiados Lima API'

  const documento = new GoogleSpreadsheet(spreadSheetId)
  await documento.useServiceAccountAuth({
    client_email: clientEmail,
    private_key: privateKey,
  })
  await documento.loadInfo()

  const sheet = documento.sheetsByTitle[titleSheet]
  await sheet.loadCells({
    startColumnIndex: 0,
    endColumnIndex: sheet.columnCount,
    startRowIndex: 0,
    endRowIndex: sheet.rowCount,
  })

  let result = {}

  switch (titleSheet) {
    case 'Home':
      result = getHomeData(sheet)
      break

    case 'Contagiados Lima API':
    case 'Contagiados Nacional API':
      result = getInfectedData(sheet)
      break

    case 'Camas UCI':
    case 'Mas Informacion':
      result = getRowsWithColsAsKeys(sheet)
      break

    default:
      break
  }

  return result
}

export default {
  fetch,
  params,
  ttl: 600,
}
