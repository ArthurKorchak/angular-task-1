import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Store } from '@ngrx/store';
import { MainActions } from 'src/app/core/state/main.actions';
import { API_BASE_URL } from 'src/app/core/constants/api-params';
import { UserReport } from 'src/app/core/models/user-report';
import { AssessmentReport } from 'src/app/core/models/assessment-report';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient, private store$: Store) { };

  public getUserReports(): void {

    this.http.get<UserReport[]>(`${API_BASE_URL}/api/userassessments`)
      .subscribe(res => {
        this.store$.dispatch(MainActions.setUserReports({ userReports: res }));
      });
  };

  public getAssessmentReport(id: string): void {
    
    this.store$.dispatch(MainActions.setAssessmentReport({ assessmentReport: undefined}));
    this.http.get<AssessmentReport>(`${API_BASE_URL}/api/userassessment/graph?id=${id}`)
      .subscribe(res => {
        this.store$.dispatch(MainActions.setAssessmentReport({ assessmentReport: res }));
      });
  };

  public getUsers(): void {

    this.http.get<User[]>(`${API_BASE_URL}/api/users`)
      .subscribe(res => {
        this.store$.dispatch(MainActions.setUsers({ users: res }));
      });
  };
};