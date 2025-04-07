export interface MarketData {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    timestamp: number;
  }
  
  export interface AlertRule {
    id: string;
    symbol: string;
    condition: 'above' | 'below';
    price: number;
    active: boolean;
  }
  
  export interface AuditLogEntry {
    id: string;
    timestamp: Date;
    eventType: 'ALERT_TRIGGERED' | 'ALERT_CREATED' | 'ALERT_UPDATED' | 'ALERT_DELETED';
    message: string;
    data: {
      symbol?: string;
      price?: number;
      alertRule?: Partial<AlertRule>;
    };
  }