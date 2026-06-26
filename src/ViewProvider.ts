import * as vscode from 'vscode';

export class ViewProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView
    ): void | Thenable<void> {
        this._view = webviewView;
        webviewView.webview.html = this.getHtmlForWebview(webviewView);
        webviewView.webview.options = {
            enableScripts: true
        };
    }

    private getHtmlForWebview(webview: vscode.WebviewView) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My Extension View</title>
            <style>
                textarea {
                    background-color: var(--vscode-editor-background);
                    color: var(--vscode-editor-foreground);
                    width: 100%;
                    font-family: sans-serif;
                }
            </style>
            </head>
            <body>
                <h2>Ask</h2>
                <textarea></textarea>
                <script>
                    alert("Hello world!");
                </script>
            </body>
            </html>
        `;
    }
}