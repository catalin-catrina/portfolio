/*!
 * Project Name: Social Media App (Placeholder)
 * Author: Catalin-Leonida Catrina
 * License: MIT
 * © 2024 Catalin-Leonida Catrina
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
