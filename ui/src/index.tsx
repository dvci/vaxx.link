import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { HashRouter, Route, Routes } from "react-router-dom";
import App, { SettingsPage, SHLinkCreate, SHLinkCreateCustom, SHLinkDetail, SHLinks, Vaccines, ErrorPage } from './App';
import QrScan from './QrScan';
import { QrDataProvider } from './QrDataProvider';
import './index.css';
import reportWebVitals from './reportWebVitals';

let root = ReactDOMClient.createRoot(document.getElementById('root')!);

root.render(
  <QrDataProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Vaccines/>} />
          <Route path="health-links/new" element={<SHLinkCreate />} />
          <Route path="health-links/new-custom" element={<SHLinkCreateCustom />} />   
          <Route path="scan" element={<QrScan />} />
          <Route path="health-links" element={<SHLinks />} />
          <Route path="health-links/:datasetId/:shlinkId" element={<SHLinkDetail />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="error" element={<ErrorPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </QrDataProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
