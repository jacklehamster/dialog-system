import React from 'react';
import { Layout } from './layout/Layout';
import { Style } from "./Style";

export interface ElemProps {
  uid?: string;
  layout: Layout;
  style?: Style;
  disabled?: boolean;
  children: React.ReactNode;
}
