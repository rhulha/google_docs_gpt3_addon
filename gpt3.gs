function onOpen(e) {
  DocumentApp.getUi().createAddonMenu().addItem("Start", "showSidebar").addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile("sidebar").setTitle("GPT3");
  DocumentApp.getUi().showSidebar(ui);
}

function getCompleteText() {
  return DocumentApp.getActiveDocument().getBody().getText();
}

function test() {
  //insertText("test");
  var body = DocumentApp.getActiveDocument().getBody();
  var range = body.findText("\\[insert\\]");
  console.log(range.toString());
  var el = range.getElement();
  var t = el.asText();
  if( t.getText() == "[insert]") {
    console.log(t.getText());
    t.setText("te3st")
  }
  
}

function insertText(text) {
  var body = DocumentApp.getActiveDocument().getBody();
  var range = body.findText("\\[insert\\]");
  if( range != null ) {
    var el = range.getElement();
    var t = el.asText();
    if( t.getText() == "[insert]") {
      t.setText("[insert]\m" + text + "\n[insert end]\n");
    } else {
      console.log("[insert] not found");
    }
  } else {
    const cursor = DocumentApp.getActiveDocument().getCursor();
    cursor.insertText(text);

  }
}

function getPrefs() {
  var up = PropertiesService.getUserProperties();
  return {
    secretAccessKey: up.getProperty("secretAccessKey"),
  };
}

function savePrefs(prefs) {
  PropertiesService.getUserProperties()
    .setProperty("secretAccessKey", prefs.secretAccessKey);
}
