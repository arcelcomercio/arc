import { GS_EMAIL_CLIENT, GS_PRIVATE_KEY } from 'fusion:environment'
import { GoogleSpreadsheet } from 'google-spreadsheet'

const clientEmail = GS_EMAIL_CLIENT
const privateKey = GS_PRIVATE_KEY
const getSpreadsheetCells = async (spreadSheetId, cellsMatrix, titleSheet) => {
  const documento = new GoogleSpreadsheet(spreadSheetId)
  await documento.useServiceAccountAuth({
    client_email: clientEmail,
    private_key: privateKey,
  })
  await documento.loadInfo()
  // const sheet = documento.sheetsByIndex[0]
  const sheet = documento.sheetsByTitle[titleSheet]
  await sheet.loadCells(cellsMatrix)
  return sheet
}
const params = [
  {
    name: 'id',
    displayName: 'ID del spreadsheet',
    type: 'text',
  },
  {
    name: 'cells',
    displayName: 'Rango de celdas',
    type: 'text',
  },
  {
    name: 'title',
    displayName: 'Nombre de la hoja de cálculo a procesar',
    type: 'text',
  },
  {
    name: 'end_rows',
    displayName: 'Cantidad de filas de la hoja de cálculo',
    type: 'text',
  },
]
const fetch = async ({ id, cells, title, end_rows: endRows = 18 }) => {
  const spreadSheetId = id || '1iiD19aWkh4UndPnqLVysDs45Xr0BE4Waupa-d1VVlQg'
  const cellsMatrix = cells || 'A1:AM18'
  const titleSheet = title || 'Contagiados Lima API'
  const sheet = await getSpreadsheetCells(
    spreadSheetId,
    cellsMatrix,
    titleSheet
  )
  const processDataByColumn = (sheetData, rows = 18, currentCols = 2) => {
    const data = {}
    data.infected_by_date = []
    for (let x = 0; x < rows; x++) {
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
    }
    return data
  }
  const calEndRow = cellsMatrix.split(':')[1].match(/\d+/)[0] // Posicion de la última fila de la hoja de cálculo
  const result = []
  const cols = sheet.columnCount // Posición de la última columna
  const initCol = 2 // Posición de la 1ra columna que tiene los valores a obtener
  const rows = endRows || calEndRow
  for (let col = initCol; col <= cols; col++) {
    result.push(processDataByColumn(sheet, rows, col))
  }
  return result
}
export default {
  fetch,
  params,
  ttl: 300,
}
