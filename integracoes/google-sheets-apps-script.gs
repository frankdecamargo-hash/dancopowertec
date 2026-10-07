/**
 * Recebe os leads do formulário /orcamento da landing page Danco | Powertec
 * e grava uma linha por envio na aba "Leads" da planilha.
 *
 * Como publicar:
 * 1. Crie uma planilha no Google Sheets (ex.: "Leads LP Danco Powertec").
 * 2. Menu Extensões > Apps Script. Apague o conteúdo e cole este arquivo.
 * 3. Implantar > Nova implantação > tipo "App da Web".
 *    - Executar como: Eu
 *    - Quem pode acessar: Qualquer pessoa
 * 4. Copie a URL gerada (termina em /exec) e coloque em
 *    NEXT_PUBLIC_LEADS_ENDPOINT no ambiente de produção da landing page.
 *
 * Sempre que alterar este script, publique uma NOVA versão da implantação.
 */

var SHEET_NAME = "Leads";

// Ordem das colunas. Campos novos enviados pelo site entram no fim automaticamente.
var COLUMNS = [
  "data_hora",
  "status",
  "nome",
  "whatsapp",
  "email",
  "empresa",
  "cidade",
  "cargo",
  "tipoCliente",
  "setor",
  "necessidade",
  "equipamento",
  "porte",
  "situacao",
  "origem_cta",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "oppref",
  "landing_page",
  "referrer",
  "event_id",
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var data = (e && e.parameter) || {};
    var sheet = getSheet_();
    var header = ensureHeader_(sheet, Object.keys(data));

    var row = header.map(function (column) {
      var value = data[column] || "";
      // Evita que números de telefone ou IDs virem fórmula/número.
      return typeof value === "string" && /^[=+\-@]/.test(value) ? "'" + value : value;
    });

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(error) })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeader_(sheet, incomingKeys) {
  var lastColumn = sheet.getLastColumn();
  var header = lastColumn > 0 ? sheet.getRange(1, 1, 1, lastColumn).getValues()[0] : [];

  if (header.length === 0) {
    header = COLUMNS.slice();
  }

  incomingKeys.forEach(function (key) {
    if (header.indexOf(key) === -1) header.push(key);
  });

  sheet.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight("bold");
  sheet.setFrozenRows(1);
  return header;
}
