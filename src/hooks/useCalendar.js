import { useState, useCallback, useRef } from "react";
import {
  getCalendarDays,
  isToday,
  isInCurrentMonth,
  isInRange,
  isSameDateDay,
  normalizeDateToDay,
  getNextMonth,
  getPrevMonth,
  isBefore,
} from "../utils/dateHelpers";

const FLIP_DURATION = 650; // match --flip-duration in CSS

export function useCalendar(initialDate = new Date()) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

  // Page-turn animation state
  const [flipDirection, setFlipDirection] = useState(null); // 'forward' | 'backward' | null
  const [isFlipping, setIsFlipping] = useState(false);
  const flipTimeoutRef = useRef(null);

  const handleDayClick = useCallback((date) => {
    const normalized = normalizeDateToDay(date);

    // If both start and end are selected, reset and start new selection
    if (rangeStart && rangeEnd) {
      setRangeStart(normalized);
      setRangeEnd(null);
      return;
    }

    // If no range selected yet, set start
    if (!rangeStart) {
      setRangeStart(normalized);
      return;
    }

    // Swap if second click is before first click
    if (isBefore(normalized, rangeStart)) {
      setRangeEnd(rangeStart);
      setRangeStart(normalized);
    } else {
      setRangeEnd(normalized);
    }
  }, [rangeStart, rangeEnd]);

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

  const isRangeStart = useCallback(
    (date) => {
      return rangeStart ? isSameDateDay(date, rangeStart) : false;
    },
    [rangeStart]
  );

  const isRangeEnd = useCallback(
    (date) => {
      return rangeEnd ? isSameDateDay(date, rangeEnd) : false;
    },
    [rangeEnd]
  );

  const isInSelectedRange = useCallback(
    (date) => {
      return rangeStart && rangeEnd ? isInRange(date, rangeStart, rangeEnd) : false;
    },
    [rangeStart, rangeEnd]
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
    rangeStart,
    rangeEnd,
    calendarDays: getCalendarDays(currentMonth),
    handleDayClick,
    goToNextMonth,
    goToPrevMonth,
    isRangeStart,
    isRangeEnd,
    isInRange: isInSelectedRange,
    isToday: isTodayDate,
    isCurrentMonth,
    // Page-turn animation state
    flipDirection,
    isFlipping,
  };
}
