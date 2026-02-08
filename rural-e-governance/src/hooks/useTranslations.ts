import { useTranslation } from 'react-i18next';

export function useTranslations() {
  const { t, i18n } = useTranslation();
  
  const getStatusTranslation = (status: string) => {
    switch (status) {
      case 'pending': return t('status.pending');
      case 'in-progress': return t('status.inProgress');
      case 'resolved': return t('status.resolved');
      case 'rejected': return t('status.rejected');
      default: return status;
    }
  };

  const getPriorityTranslation = (priority: string) => {
    switch (priority) {
      case 'low': return t('priority.low');
      case 'medium': return t('priority.medium');
      case 'high': return t('priority.high');
      default: return priority;
    }
  };

  const getCategoryTranslation = (category: string) => {
    switch (category) {
      case 'pothole': return t('category.pothole');
      case 'sanitation': return t('category.sanitation');
      case 'water': return t('category.water');
      case 'electricity': return t('category.electricity');
      case 'drainage': return t('category.drainage');
      case 'street-light': return t('category.streetLight');
      case 'other': return t('category.other');
      default: return category;
    }
  };

  return {
    t,
    i18n,
    getStatusTranslation,
    getPriorityTranslation,
    getCategoryTranslation,
  };
}