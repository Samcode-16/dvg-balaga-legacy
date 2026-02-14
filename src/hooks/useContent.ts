import { useQuery } from '@tanstack/react-query';
import type { Event, Publication, AwardEntry } from '@/data/content';

const BASE_URL = import.meta.env.BASE_URL || '/';

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}content/${path}`);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

export interface AboutData {
  en: {
    foundingTitle: string;
    founding: string;
    mysuru: string;
    award: string;
    growth: string;
    trust: string;
    future: string;
  };
  kn: {
    foundingTitle: string;
    founding: string;
    mysuru: string;
    award: string;
    growth: string;
    trust: string;
    future: string;
  };
  milestones: { year: string; en: string; kn: string }[];
  trustees: { name: { en: string; kn: string }; role: { en: string; kn: string } }[];
  founder: { en: string; kn: string };
}

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: () => fetchJSON<Event[]>('events.json'),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublications() {
  return useQuery<Publication[]>({
    queryKey: ['publications'],
    queryFn: () => fetchJSON<Publication[]>('publications.json'),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAwards() {
  return useQuery<AwardEntry[]>({
    queryKey: ['awards'],
    queryFn: () => fetchJSON<AwardEntry[]>('awards.json'),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAbout() {
  return useQuery<AboutData>({
    queryKey: ['about'],
    queryFn: () => fetchJSON<AboutData>('about.json'),
    staleTime: 5 * 60 * 1000,
  });
}
