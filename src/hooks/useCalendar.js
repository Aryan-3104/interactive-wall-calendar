import { useState, useCallback, useRef } from "react";
import {
  getCalendarDays,
  isToday,
  isInCurrentMonth,
  isSameDateDay,
  normalizeDateToDay,
  getNextMonth,
  getPrevMonth,
} from "../utils/dateHelpers";

const FLIP_DURATION = 650; // match --flip-duration in CSS

export function useCalendar(initialDate = new Date()) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(null);

  // Page-turn animation state
  const [flipDirection, setFlipDirection] = useState(null); // 'forward' | 'backward' | null
  const [isFlipping, setIsFlipping] = useState(false);
  const flipTimeoutRef = useRef(null);

  const handleDayClick = useCallback((date) => {
    const normalized = normalizeDateToDay(date);
    setSelectedDate(normalized);
  }, []);

  const goToNextMonth = useCallback(() => {
    if (isFlipping) return; // prevent double-flip
    setFlipDirection('forward');
    setIsFlipping(true);

    // Update month at the midpoint of animation (when card is edge-on)
    flipTimeoutRef.current = setTimeout(() => {
      setCurrentMonth((prev) => getNextMonth(prev));
    }, FLIP_DURATION * 0.5);

    // Reset flip state at the end
    setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection(null);
    }, FLIP_DURATION);
  }, [isFlipping]);

  const goToPrevMonth = useCallback(() => {
    if (isFlipping) return;
    setFlipDirection('backward');
    setIsFlipping(true);

    flipTimeoutRef.current = setTimeout(() => {
      setCurrentMonth((prev) => getPrevMonth(prev));
    }, FLIP_DURATION * 0.5);

    setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection(null);
    }, FLIP_DURATION);
  }, [isFlipping]);

  const isSelected = useCallback(
    (date) => {
      return selectedDate ? isSameDateDay(date, selectedDate) : false;
    },
    [selectedDate]
  );

  const isTodayDate = useCallback((date) => {
    return isToday(date);
  }, []);

  const isCurrentMonth = useCallback(
    (date) => {
      return isInCurrentMonth(date, currentMonth);
    },
    [currentMonth]
  );

  return {
    currentMonth,
    selectedDate,
    calendarDays: getCalendarDays(currentMonth),
    handleDayClick,
    goToNextMonth,
    goToPrevMonth,
    isSelected,
    isToday: isTodayDate,
    isCurrentMonth,
    // Page-turn animation state
    flipDirection,
    isFlipping,
  };
}
