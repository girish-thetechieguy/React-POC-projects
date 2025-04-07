import React from 'react';
import styles from './AuditLog.module.css';
import { AuditLogEntry } from '../../types/types';

interface AuditLogProps {
  logs: AuditLogEntry[];
}

const AuditLog: React.FC<AuditLogProps> = ({ logs }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleString();
  };

  const getEventTypeClass = (eventType: string) => {
    switch (eventType) {
      case 'ALERT_TRIGGERED':
        return styles.alertTriggered;
      case 'ALERT_CREATED':
        return styles.alertCreated;
      case 'ALERT_UPDATED':
        return styles.alertUpdated;
      case 'ALERT_DELETED':
        return styles.alertDeleted;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <h2>Audit Log</h2>
      <div className={styles.logContainer}>
        {logs.length === 0 ? (
          <div className={styles.empty}>No audit entries yet</div>
        ) : (
          <ul className={styles.logList}>
            {logs.map((log) => (
              <li key={log.id} className={`${styles.logItem} ${getEventTypeClass(log.eventType)}`}>
                <div className={styles.logHeader}>
                  <span className={styles.timestamp}>{formatDate(log.timestamp)}</span>
                  <span className={styles.eventType}>{log.eventType.replace('_', ' ')}</span>
                </div>
                <div className={styles.message}>{log.message}</div>
                {log.eventType === 'ALERT_TRIGGERED' && (
                  <div className={styles.details}>
                    {log.data.symbol} reached {log.data.price}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AuditLog;