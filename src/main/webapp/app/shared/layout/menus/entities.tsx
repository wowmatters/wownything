import React, { Suspense } from 'react';
import { translate } from 'react-jhipster';
import { importRemote } from '@module-federation/utilities';
import { NavDropdown } from './menu-components';

const EntitiesMenuItems = React.lazy(() => import('app/entities/menu').catch(() => import('app/shared/error/error-loading')));

const WowpassportEntitiesMenuItems = React.lazy(async () =>
  importRemote<any>({
    url: `./services/wowpassport`,
    scope: 'wowpassport',
    module: './entities-menu',
  }).catch(() => import('app/shared/error/error-loading')),
);

const WowmigasEntitiesMenuItems = React.lazy(async () =>
  importRemote<any>({
    url: `./services/wowmigas`,
    scope: 'wowmigas',
    module: './entities-menu',
  }).catch(() => import('app/shared/error/error-loading')),
);

const WowshiplogisticEntitiesMenuItems = React.lazy(async () =>
  importRemote<any>({
    url: `./services/wowshiplogistic`,
    scope: 'wowshiplogistic',
    module: './entities-menu',
  }).catch(() => import('app/shared/error/error-loading')),
);

const WowcasemgmtEntitiesMenuItems = React.lazy(async () =>
  importRemote<any>({
    url: `./services/wowcasemgmt`,
    scope: 'wowcasemgmt',
    module: './entities-menu',
  }).catch(() => import('app/shared/error/error-loading')),
);

const WowosintEntitiesMenuItems = React.lazy(async () =>
  importRemote<any>({
    url: `./services/wowosint`,
    scope: 'wowosint',
    module: './entities-menu',
  }).catch(() => import('app/shared/error/error-loading')),
);

export const EntitiesMenu = () => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <Suspense fallback={<div>loading...</div>}>
      <EntitiesMenuItems />
    </Suspense>
    <Suspense fallback={<div>loading...</div>}>
      <WowpassportEntitiesMenuItems />
    </Suspense>
    <Suspense fallback={<div>loading...</div>}>
      <WowmigasEntitiesMenuItems />
    </Suspense>
    <Suspense fallback={<div>loading...</div>}>
      <WowshiplogisticEntitiesMenuItems />
    </Suspense>
    <Suspense fallback={<div>loading...</div>}>
      <WowcasemgmtEntitiesMenuItems />
    </Suspense>
    <Suspense fallback={<div>loading...</div>}>
      <WowosintEntitiesMenuItems />
    </Suspense>
  </NavDropdown>
);
