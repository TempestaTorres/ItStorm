import { Routes } from '@angular/router';
import {Layout} from './components/layout/layout/layout';
import {Login} from './pages/login/login';
import {authGuard} from './gards/auth-guard';
import {Signup} from './pages/signup/signup';
import {PrivacyPolicy} from './pages/privacy-policy/privacy-policy';
import {Home} from './pages/home/home';
import {Article} from './pages/article/article';
import {Blog} from './pages/blog/blog';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'login', component: Login, canActivate: [authGuard] },
      { path: 'signup', component: Signup, canActivate: [authGuard] },
      { path: 'privacy-policy', component: PrivacyPolicy },
      { path: 'article/:title', component: Article },
      { path: 'blog', component: Blog },
    ]
  }
];
