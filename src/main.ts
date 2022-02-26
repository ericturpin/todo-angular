import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function setupMocks() {
  await import('./app/mock-definitions');
}

async function main() {
  if (environment.production) {
    enableProdMode();
  }

  if (!environment.production) {
    await setupMocks();
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}

main();
