import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState } from
'react';
import {
  correctiveActions as seedActions,
  hazards as seedHazards,
  notifications as seedNotifications } from
'../data/mockData';
import type {
  CorrectiveAction,
  Hazard,
  HazardCategory,
  Notification,
  Priority,
  Role } from
'../types';

interface AssignPayload {
  title: string;
  description: string;
  assignedTo: string;
  priority: Priority;
  dueDate: string;
  notes?: string;
}

interface AppState {
  role: Role | null;
  hazards: Hazard[];
  actions: CorrectiveAction[];
  notifications: Notification[];
  toast: string | null;
  login: (role: Role) => void;
  logout: () => void;
  showToast: (message: string) => void;
  dismissToast: () => void;
  reviewHazard: (
  hazardId: string,
  decision: 'Accepted' | 'Overridden',
  category: HazardCategory,
  reason?: string)
  => void;
  assignAction: (hazardId: string, payload: AssignPayload) => string;
  startAction: (actionId: string) => void;
  resolveAction: (actionId: string, notes: string, evidenceUrl?: string) => void;
  verifyAction: (actionId: string) => void;
  reopenAction: (actionId: string, reason: string) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: (audience: Role) => void;
  stats: {
    totalHazards: number;
    openHazards: number;
    criticalHazards: number;
    resolvedHazards: number;
    openActions: number;
    overdueActions: number;
  };
}

const AppContext = createContext<AppState | null>(null);

let actionCounter = 106;

export function AppProvider({ children }: {children: React.ReactNode;}) {
  const [role, setRole] = useState<Role | null>(null);
  const [hazards, setHazards] = useState<Hazard[]>(seedHazards);
  const [actions, setActions] = useState<CorrectiveAction[]>(seedActions);
  const [notificationList, setNotificationList] =
  useState<Notification[]>(seedNotifications);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast((t) => t === message ? null : t), 4000);
  }, []);

  const pushNotification = useCallback(
    (notification: Notification) =>
    setNotificationList((list) => [notification, ...list]),
    []
  );

  const login = useCallback((next: Role) => setRole(next), []);
  const logout = useCallback(() => setRole(null), []);

  const reviewHazard: AppState['reviewHazard'] = useCallback(
    (hazardId, decision, category, reason) => {
      setHazards((list) =>
      list.map((h) =>
      h.id === hazardId ?
      {
        ...h,
        status: h.status === 'Submitted' ? 'Under Review' : h.status,
        category,
        managerReview: {
          decision,
          category,
          reason,
          reviewedAt: '10 Aug 2026 – 10:05 AM'
        }
      } :
      h
      )
      );
    },
    []
  );

  const assignAction: AppState['assignAction'] = useCallback(
    (hazardId, payload) => {
      actionCounter += 1;
      const id = `A-${actionCounter}`;
      const hazard = seedHazards.find((h) => h.id === hazardId);
      const [name, roleLabel] = payload.assignedTo.split(' – ');
      setActions((list) => [
      {
        id,
        hazardId,
        hazardTitle: hazard?.title ?? 'Hazard',
        title: payload.title,
        description: payload.description,
        assignedTo: name,
        assignedToRole: roleLabel ?? 'Employee',
        priority: payload.priority,
        dueDate: payload.dueDate,
        status: 'Open',
        notes: payload.notes
      },
      ...list]
      );
      setHazards((list) =>
      list.map((h) =>
      h.id === hazardId ? { ...h, status: 'Action Assigned', actionId: id } : h
      )
      );
      pushNotification({
        id: `N-${Date.now()}`,
        audience: 'employee',
        title: 'New corrective action assigned',
        body: `${id} · ${payload.title}`,
        time: 'Just now',
        read: false,
        tone: 'info',
        link: `/employee/actions/${id}`
      });
      return id;
    },
    [pushNotification]
  );

  const startAction: AppState['startAction'] = useCallback((actionId) => {
    setActions((list) =>
    list.map((a) => a.id === actionId ? { ...a, status: 'In Progress' } : a)
    );
  }, []);

  const resolveAction: AppState['resolveAction'] = useCallback(
    (actionId, notes, evidenceUrl) => {
      let hazardId = '';
      setActions((list) =>
      list.map((a) => {
        if (a.id !== actionId) return a;
        hazardId = a.hazardId;
        return {
          ...a,
          status: 'Resolved',
          resolutionNotes: notes,
          evidenceUrl,
          completedAt: '10 Aug 2026 – 02:15 PM',
          overdue: false
        };
      })
      );
      setHazards((list) =>
      list.map((h) =>
      h.id === hazardId ? { ...h, status: 'Resolved', afterImageUrl: evidenceUrl } : h
      )
      );
      pushNotification({
        id: `N-${Date.now()}`,
        audience: 'manager',
        title: `Corrective Action ${actionId} resolved — verification required`,
        body: notes,
        time: 'Just now',
        read: false,
        tone: 'info',
        link: '/manager/actions'
      });
    },
    [pushNotification]
  );

  const verifyAction: AppState['verifyAction'] = useCallback((actionId) => {
    let hazardId = '';
    setActions((list) =>
    list.map((a) => {
      if (a.id !== actionId) return a;
      hazardId = a.hazardId;
      return { ...a, status: 'Verified', overdue: false };
    })
    );
    setHazards((list) =>
    list.map((h) => h.id === hazardId ? { ...h, status: 'Verified' } : h)
    );
  }, []);

  const reopenAction: AppState['reopenAction'] = useCallback(
    (actionId, reason) => {
      let hazardId = '';
      setActions((list) =>
      list.map((a) => {
        if (a.id !== actionId) return a;
        hazardId = a.hazardId;
        return { ...a, status: 'Reopened', reopenReason: reason };
      })
      );
      setHazards((list) =>
      list.map((h) =>
      h.id === hazardId ? { ...h, status: 'Action Assigned' } : h
      )
      );
      pushNotification({
        id: `N-${Date.now()}`,
        audience: 'employee',
        title: 'Corrective action reopened by Manager',
        body: `${actionId} · ${reason}`,
        time: 'Just now',
        read: false,
        tone: 'warning',
        link: `/employee/actions/${actionId}`
      });
    },
    [pushNotification]
  );

  const markNotificationRead = useCallback((id: string) => {
    setNotificationList((list) =>
    list.map((n) => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const markAllRead = useCallback((audience: Role) => {
    setNotificationList((list) =>
    list.map((n) => n.audience === audience ? { ...n, read: true } : n)
    );
  }, []);

  const stats = useMemo(() => {
    const openHazards = hazards.filter((h) => h.status !== 'Verified').length;
    const criticalHazards = hazards.filter(
      (h) => h.ai.riskLevel === 'Critical' && h.status !== 'Verified'
    ).length;
    const verified = hazards.filter((h) => h.status === 'Verified').length;
    const openActions = actions.filter((a) => a.status !== 'Verified').length;
    const overdueActions = actions.filter(
      (a) => a.overdue && a.status !== 'Verified'
    ).length;
    return {
      totalHazards: 120 + hazards.length,
      openHazards: 19 + openHazards,
      criticalHazards: 4 + criticalHazards,
      resolvedHazards: 101 + verified,
      openActions: 14 + openActions,
      overdueActions: 2 + overdueActions
    };
  }, [hazards, actions]);

  const value: AppState = {
    role,
    hazards,
    actions,
    notifications: notificationList,
    toast,
    login,
    logout,
    showToast,
    dismissToast: () => setToast(null),
    reviewHazard,
    assignAction,
    startAction,
    resolveAction,
    verifyAction,
    reopenAction,
    markNotificationRead,
    markAllRead,
    stats
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}