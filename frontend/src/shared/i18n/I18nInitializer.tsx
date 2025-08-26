"use client";

import { useEffect, useState } from "react";
import "./i18n";

export function I18nInitializer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // i18n уже инициализирован в импорте
  }, []);

  // Не рендерим ничего до монтирования на клиенте
  if (!mounted) {
    return null;
  }

  return null;
}
