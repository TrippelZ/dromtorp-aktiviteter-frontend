import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import './colors.css';
import HomePage from './pages/homePage/homePage';
import NoPage from './pages/noPage/noPage';
import { GetActivities, GetActivityById, GetPermissionLevel, ValidateSession } from './api';
import LoginPage from './pages/loginPage/loginPage';
import SignupPage from './pages/signupPage/signupPage';
import ActivitiesPage from './pages/activitiesPage/activitiesPage';
import ActivityPage from './pages/activityPage/activityPage';

const ValidationLoader = async () => {
  const validSession = await ValidateSession();
  
  if (!validSession) {
    return {
      valid: false,
      error: "Problemer med å nå serveren!"
    }
  } else if (validSession.Error) {
    return {
      valid: false,
      error: validSession.Error
    }
  }
  return {
    valid: true,
    userId: validSession
  }
}

const ActivitiesLoader = async () => {
  const validSession = await ValidateSession();

  if (validSession.Error) {
    return {
      valid: false,
      error: validSession.Error
    }
  }


  const activities = await GetActivities();

  if (!activities) {
    return {
      valid: true,
      userId: validSession,
      data: []
    }
  }

  if (activities.Error) {
    return {
      valid: true,
      userId: validSession,
      error: activities.Error
    }
  }

  return {
    valid: true,
    userId: validSession,
    data: activities
  }
}

const ViewActivityLoader = async ({params}) => {
  const validSession = await ValidateSession();

  if (validSession.Error) {
    return {
      valid: false,
      error: validSession.Error
    }
  }


  const activity = await GetActivityById(params.activityId);

  if (!activity) {
    return {
      valid: true,
      userId: validSession,
      data: false
    }
  }

  if (activity.Error) {
    return {
      valid: true,
      userId: validSession,
      data: false,
      error: activity.Error
    }
  }


  const permissionLevel = await GetPermissionLevel(validSession.userId);

  if (!permissionLevel) {
    return {
      valid: true,
      userId: validSession,
      data: activity,
      canEdit: false
    }
  }

  if (permissionLevel.Error) {
    return {
      valid: true,
      userId: validSession,
      data: activity,
      canEdit: false,
      error: permissionLevel.Error
    }
  }


  return {
    valid: true,
    userId: validSession,
    data: activity,
    canEdit: permissionLevel >= 2
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} loader={ValidationLoader} />
      <Route index element={<HomePage />} loader={ValidationLoader} />

      <Route path="/home" element={<HomePage />} loader={ValidationLoader} />

      <Route path="/user/:userId" element={<NoPage />} />
      <Route path="/user/:userId/activities" element={<NoPage />} />

      <Route path="/activities" element={<ActivitiesPage />} loader={ActivitiesLoader} />
      <Route path="/activities/:activityId" element={<ActivityPage />} loader={ViewActivityLoader} />

      <Route path="/activities/create" element={<NoPage />} />
      <Route path="/activities/:activityId/configure" element={<NoPage />} />

      <Route path="/login" element={<LoginPage />} loader={ValidationLoader} />
      <Route path="/register" element={<SignupPage />} loader={ValidationLoader} />

      <Route path="*" element={<NoPage />} />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);