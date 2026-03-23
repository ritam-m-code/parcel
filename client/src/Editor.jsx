// Collaborative CodeMirror editor wired to Yjs over a websocket provider.
import { useEffect, useRef } from 'react';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { yCollab } from 'y-codemirror.next';

const DEFAULT_TEXT = `// Open this URL in another tab to collaborate in real time.\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('parcel'));\n`;

function getRoomName() {
  const path = window.location.pathname.replace(/^\//, '').trim();
  return path || 'default-room';
}

function getWebsocketUrl() {
  if (import.meta.env.VITE_WS_URL) {
    return import.meta.env.VITE_WS_URL;
  }

  const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  return `${wsProtocol}://${window.location.host}/yjs`;
}

function Editor() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const roomName = getRoomName();
    const ydoc = new Y.Doc();
    const ytext = ydoc.getText('codemirror');

    if (ytext.length === 0) {
      ytext.insert(0, DEFAULT_TEXT);
    }

    const provider = new WebsocketProvider(getWebsocketUrl(), roomName, ydoc);

    const state = EditorState.create({
      doc: ytext.toString(),
      extensions: [
        lineNumbers(),
        keymap.of([indentWithTab]),
        javascript(),
        yCollab(ytext, provider.awareness),
        EditorView.theme({
          '&': {
            height: '100%',
            border: '1px solid rgb(51 65 85)',
            borderRadius: '0.5rem',
            backgroundColor: 'rgb(15 23 42)',
            color: 'rgb(241 245 249)',
            fontSize: '14px'
          },
          '.cm-scroller': {
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
          },
          '.cm-gutters': {
            backgroundColor: 'rgb(15 23 42)',
            color: 'rgb(148 163 184)',
            borderRight: '1px solid rgb(51 65 85)'
          },
          '.cm-content': {
            caretColor: 'rgb(14 165 233)'
          },
          '&.cm-focused .cm-cursor': {
            borderLeftColor: 'rgb(14 165 233)'
          },
          '&.cm-focused .cm-selectionBackground, ::selection': {
            backgroundColor: 'rgb(30 41 59)'
          }
        })
      ]
    });

    const view = new EditorView({
      state,
      parent: containerRef.current
    });

    return () => {
      view.destroy();
      provider.destroy();
      ydoc.destroy();
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}

export default Editor;
