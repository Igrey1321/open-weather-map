import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import React from 'react';
import Home from '../../pages/home';
import Detail from '../../pages/detail/Detail';

export default function Root() {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/city/:name" element={<Detail />} />
      </Routes>
    </Layout>
  );
}
