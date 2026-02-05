import { useQuery } from '@tanstack/react-query'
import api from '../api/api'

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ['my-short-urls', token],
    enabled: !!token,

    queryFn: async () => {
      const res = await api.get('/api/urls/myurls', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    },

    select: (data) => {
      return [...data].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      )
    },

    staleTime: 5000,
    onError,
  })
}

export const useFetchTotalClicks = (token, onError, startDate, endDate) => {
  return useQuery({
    queryKey: ['url-total-clicks', token, startDate, endDate],
    enabled: !!token && !!startDate && !!endDate,

    queryFn: async () => {
      const res = await api.get(
        `/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return res.data
    },

    select: (data) => {
      if (!data) return []; // Handle null/undefined data

      const result = [];
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Create a map for quick lookup
      const dataMap = data || {};

      const currentDate = new Date(start);
      while (currentDate <= end) {
        const dateStr = currentDate.toISOString().split('T')[0];
        result.push({
          clickDate: dateStr,
          count: dataMap[dateStr] || 0,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return result;
    },

    staleTime: 2000,
    onError,
  })
}
