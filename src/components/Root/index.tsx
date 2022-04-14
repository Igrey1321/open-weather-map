import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import React from 'react';
import NotFoundScreen from '../NotFoundScreen';
import HomeScreen from '../HomeScreen';
import Detail from '../../pages/Detail';

export default function Root() {
  return (
    <Layout>
      <Routes>
        <Route path="" element={<HomeScreen />} />
        <Route path="/city/:name" element={<Detail />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Layout>
  );
}
