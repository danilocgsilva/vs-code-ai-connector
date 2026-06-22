import * as vscode from 'vscode';

export class ViewProvider implements vscode.WebviewViewProvider {
    public resolveWebviewView(webviewView: vscode.WebviewView) {
        webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);
    }

    private getHtmlForWebview(webview: vscode.Webview) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My Extension View</title>
            </head>
            <body>
                <h1>Hello from My Extension!</h1>
                <p>This is a custom sidebar view.</p>
            </body>
            </html>
        `;
    }
}