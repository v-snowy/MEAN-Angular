import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Position, Message } from '../interfaces';

@Injectable()
export class PositionsService {

  constructor(
    private http: HttpClient
  ) {}

  getPositions(id: string): Observable<Position[]> {
    if (!id) { return; }
    return this.http.get<Position[]>(`/api/position/${id}`);
  }

  createPosition(position: Position): Observable<Position> {
    if (!position) { return; }
    return this.http.post<Position>(`/api/position`, position);
  }

  updatePosition(position: Position): Observable<Position> {
    if (!position) { return; }
    return this.http.patch<Position>(`/api/position/${position._id}`, position);
  }

  deletePosition(id: string): Observable<Message> {
    if (!id) { return; }
    return this.http.delete<Message>(`/api/position/${id}`);
  }
}
