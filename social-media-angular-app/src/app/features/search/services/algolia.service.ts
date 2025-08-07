import { Injectable } from '@angular/core';
import { searchClient } from '@algolia/client-search';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlgoliaService {
  client = searchClient(
    environment.algolia.app_id,
    environment.algolia.api_key
  );

  search(query: string) {
    return this.client.searchSingleIndex({
      indexName: 'users_index',
      searchParams: { query: query },
    });
  }
}
