import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from '../routes'; 

const CustomRouter = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={React.createElement(route.element)} />
      ))}
    </Routes>
  );
};

export default CustomRouter;
