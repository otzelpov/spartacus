/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Product } from '../../../model/product.model';
import { StateUtils } from '../../../state/utils/index';
import { EntityScopedLoaderState } from '../../../state/utils/scoped-loader/scoped-loader.state';
import { ProductsState, StateWithProduct } from '../product-state';
import { getProductsState } from './feature.selector';

export const getProductState: MemoizedSelector<
  StateWithProduct,
  EntityScopedLoaderState<Product>
> = createSelector(getProductsState, (state: ProductsState) => state.details);

export const getSelectedProductStateFactory = (
  code: string,
  scope = ''
): MemoizedSelector<StateWithProduct, StateUtils.LoaderState<Product>> => {
  return createSelector(
    getProductState,
    (details) =>
      (StateUtils.entityLoaderStateSelector(details, code) as any)[scope] ||
      StateUtils.initialLoaderState
  );
};

export const getSelectedProductFactory = (
  code: string,
  scope = ''
): MemoizedSelector<StateWithProduct, Product> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    (productState) => StateUtils.loaderValueSelector(productState)
  );
};

export const getSelectedProductLoadingFactory = (
  code: string,
  scope = ''
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    (productState) => StateUtils.loaderLoadingSelector(productState)
  );
};

export const getSelectedProductSuccessFactory = (
  code: string,
  scope = ''
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    (productState) => StateUtils.loaderSuccessSelector(productState)
  );
};

export const getSelectedProductErrorFactory = (
  code: string,
  scope = ''
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    (productState) => StateUtils.loaderErrorSelector(productState)
  );
};

export const getAllProductCodes: MemoizedSelector<StateWithProduct, string[]> =
  createSelector(getProductState, (details) => {
    return Object.keys(details.entities);
  });
