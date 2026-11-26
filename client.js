window.__ModuleLoader__.load({
  id: "dsh-workspace-category",
  factory: (require) => {
    const React = require("react");
    const ReactDOM = require("react-dom");
    const h = React.createElement;
    const {
      useCallback,
      useEffect,
      useId,
      useMemo,
      useRef,
      useState,
      useSyncExternalStore,
    } = React;

    const NS = "workspaceCategory";
    const ENTRY_ID = "workspace-category";
    const CONFIG_KEY = "dsh-workspace-category#workspace-category";
    const ICON_KEY = "workspaceCategory.tag";
    const FILTER_STORAGE_KEY = "dsh-workspace-category.active-filter.v1";
    const UNCATEGORIZED = "__uncategorized__";

    // Labels the shipped ui-workspace renders for its section header. The
    // category control only attaches while the workspace list is in its
    // grouped-by-workspace mode; "Sessions" means the flat mode is active and
    // row-level workspace filtering would be misleading.
    const WORKSPACE_SECTION_LABELS = new Set([
      "工作区",
      "Workspaces",
      "ワークスペース",
      "Espacios de trabajo",
      "Espaces de travail",
      "Arbeitsbereiche",
      "Рабочие пространства",
      "Espaços de trabalho",
    ]);
    const SESSION_SECTION_LABELS = new Set([
      "会话",
      "Sessions",
      "セッション",
      "Sesiones",
      "Séances",
      "Sitzungen",
      "Сессии",
      "Sessões",
    ]);

    const zh = {
      "menu.all": "全部工作区",
      "menu.uncategorized": "未分类",
      "menu.category": "分类设置",
      "menu.filterAria": "筛选工作区分类",
      "menu.activeAria": "当前分类：{name}。点击更改筛选。",
      "menu.openAria": "选择工作区分类",
      "menu.empty": "暂无分类",
      "modal.title": "分类设置",
      "modal.workspace": "工作区：{name}",
      "modal.category": "分类",
      "modal.newPlaceholder": "新分类名称",
      "modal.create": "新建",
      "modal.save": "保存",
      "modal.cancel": "取消",
      "modal.newBadge": "新",
      "modal.loading": "正在读取分类…",
      "modal.readOnly": "当前分类配置为只读，无法修改。",
      "modal.unavailable": "分类配置不可用，请确认设置服务已加载。",
      "config.summary": "{categories} 个分类 · {workspaces} 个工作区已分类",
      "config.summaryLoading": "分类读取中…",
      "config.summaryUnavailable": "分类配置不可用",
      "config.loading": "正在读取分类配置…",
      "config.description": "按分类筛选侧栏中的工作区。分类顺序决定菜单顺序，“未分类”始终排在最后。",
      "config.categories": "分类",
      "config.empty": "还没有分类。先添加一个分类，再到工作区的“…”菜单里指定分类。",
      "config.addPlaceholder": "新分类名称",
      "config.add": "添加分类",
      "config.saving": "保存中…",
      "config.savedHint": "修改会立即保存。",
      "config.readOnly": "当前配置为只读。",
      "config.unavailable": "分类配置不可用。请确认设置服务已加载后重试。",
      "config.retry": "重试",
      "config.up": "上移",
      "config.down": "下移",
      "config.rename": "重命名",
      "config.delete": "删除",
      "config.save": "保存",
      "config.cancel": "取消",
      "config.confirmDelete": "确认删除",
      "config.deleteWarning": "删除后，其下 {n} 个工作区将变为未分类。",
      "config.workspaceCount": "{n} 个工作区",
      "config.renamePlaceholder": "分类名称",
      "filter.empty": "此分类下暂无工作区",
      "error.nameRequired": "请输入分类名称。",
      "error.nameTooLong": "分类名称最多 40 个字符。",
      "error.duplicateName": "分类名称已存在。",
      "error.reservedName": "该名称是保留名称，请换一个。",
      "error.writeFailed": "保存失败，请重试。",
      "error.unavailable": "分类配置不可用。",
      "error.readOnly": "当前配置为只读。",
      "error.busy": "正在保存，请稍候。",
      "error.invalidName": "分类名称无效。",
    };

    const en = {
      "menu.all": "All workspaces",
      "menu.uncategorized": "Uncategorized",
      "menu.category": "Category settings",
      "menu.filterAria": "Filter workspaces by category",
      "menu.activeAria": "Current category: {name}. Click to change the filter.",
      "menu.openAria": "Choose a workspace category",
      "menu.empty": "No categories yet",
      "modal.title": "Category settings",
      "modal.workspace": "Workspace: {name}",
      "modal.category": "Category",
      "modal.newPlaceholder": "New category name",
      "modal.create": "Create",
      "modal.save": "Save",
      "modal.cancel": "Cancel",
      "modal.newBadge": "New",
      "modal.loading": "Reading categories…",
      "modal.readOnly": "Category configuration is read-only.",
      "modal.unavailable": "Category configuration is unavailable. Confirm the settings service is loaded.",
      "config.summary": "{categories} categories · {workspaces} workspaces categorized",
      "config.summaryLoading": "Reading categories…",
      "config.summaryUnavailable": "Category configuration unavailable",
      "config.loading": "Reading category configuration…",
      "config.description": "Filter the sidebar by category. Category order defines menu order; “Uncategorized” always comes last.",
      "config.categories": "Categories",
      "config.empty": "No categories yet. Add one, then choose it from a workspace's “…” menu.",
      "config.addPlaceholder": "New category name",
      "config.add": "Add category",
      "config.saving": "Saving…",
      "config.savedHint": "Changes save immediately.",
      "config.readOnly": "This configuration is read-only.",
      "config.unavailable": "Category configuration is unavailable. Confirm the settings service is loaded, then retry.",
      "config.retry": "Retry",
      "config.up": "Move up",
      "config.down": "Move down",
      "config.rename": "Rename",
      "config.delete": "Delete",
      "config.save": "Save",
      "config.cancel": "Cancel",
      "config.confirmDelete": "Delete",
      "config.deleteWarning": "Deleting this category moves its {n} workspaces to Uncategorized.",
      "config.workspaceCount": "{n} workspaces",
      "config.renamePlaceholder": "Category name",
      "filter.empty": "No workspaces in this category",
      "error.nameRequired": "Enter a category name.",
      "error.nameTooLong": "Use at most 40 characters.",
      "error.duplicateName": "That category name already exists.",
      "error.reservedName": "That name is reserved; choose another.",
      "error.writeFailed": "Could not save. Try again.",
      "error.unavailable": "Category configuration is unavailable.",
      "error.readOnly": "This configuration is read-only.",
      "error.busy": "Saving. Try again in a moment.",
      "error.invalidName": "That category name is not valid.",
    };

    const CSS = `
      /* The active category name is drawn by the header control; keep the
         shipped label in layout for measurement but remove its glyphs so the
         two labels cannot overlap. */
      html[data-wsc-filter="active"] [class*="_sectionHeader"] > span[class*="_sectionLabel"] {
        visibility: hidden !important;
      }
      .wsc-trigger {
        font-family: inherit;
        border: 0;
        background: transparent;
        cursor: pointer;
        pointer-events: auto;
        box-sizing: border-box;
      }
      .wsc-trigger:hover { background: var(--dsw-alias-bg-layer-2); }
      .wsc-trigger:focus-visible {
        outline: var(--dsw-focus-ring-width, 2px) solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
        outline-offset: -2px;
      }
      .wsc-trigger[data-active="true"] { color: var(--dsw-alias-brand-primary, #4d6bfe); }
      .wsc-label {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .wsc-menu {
        position: fixed;
        z-index: 1300;
        box-sizing: border-box;
        padding: 4px;
        overflow-y: auto;
        color: var(--dsw-alias-label-primary);
        background: var(--dsw-alias-bg-overlay);
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: var(--dsw-radius-lg, 10px);
        box-shadow: var(--dsw-elevation-prominent, 0 12px 32px rgba(0, 0, 0, .18));
        font-size: 13px;
        line-height: 20px;
      }
      .wsc-menu-item {
        display: flex;
        align-items: center;
        gap: 8px;
        box-sizing: border-box;
        width: 100%;
        height: 32px;
        padding: 0 8px;
        border: 0;
        border-radius: var(--dsw-radius-sm, 5px);
        background: transparent;
        color: inherit;
        font: inherit;
        text-align: left;
        cursor: pointer;
      }
      .wsc-menu-item:hover,
      .wsc-menu-item:focus-visible {
        background: var(--dsw-alias-bg-layer-2);
        outline: none;
      }
      .wsc-menu-check {
        display: inline-flex;
        flex: none;
        align-items: center;
        justify-content: center;
        width: 14px;
        height: 14px;
        color: var(--dsw-alias-brand-primary, #4d6bfe);
      }
      .wsc-menu-label {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .wsc-menu-sep {
        height: 1px;
        margin: 4px 6px;
        background: var(--dsw-alias-border-l1);
      }
      .wsc-empty {
        font-size: 12px;
        line-height: 18px;
        color: var(--dsw-alias-label-tertiary);
      }
      .wsc-modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 1400;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 16px;
        background: color-mix(in srgb, var(--dsw-alias-label-primary) 28%, transparent);
      }
      .wsc-modal {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: min(440px, 100%);
        max-height: min(640px, 90vh);
        overflow: hidden;
        color: var(--dsw-alias-label-primary);
        background: var(--dsw-alias-bg-overlay);
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: var(--dsw-radius-lg, 10px);
        box-shadow: var(--dsw-elevation-prominent, 0 18px 48px rgba(0, 0, 0, .22));
      }
      .wsc-modal:focus { outline: none; }
      .wsc-modal-head {
        padding: 16px 18px 8px;
      }
      .wsc-modal-title {
        margin: 0;
        font-size: 16px;
        line-height: 24px;
        font-weight: 600;
      }
      .wsc-modal-sub {
        margin-top: 2px;
        overflow: hidden;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 18px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .wsc-modal-body {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 8px 18px 14px;
        overflow-y: auto;
      }
      .wsc-radio-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
        max-height: 300px;
        overflow-y: auto;
      }
      .wsc-radio {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 7px 8px;
        border-radius: var(--dsw-radius-sm, 5px);
        color: var(--dsw-alias-label-primary);
        font-size: 13px;
        line-height: 20px;
        cursor: pointer;
      }
      .wsc-radio:hover { background: var(--dsw-alias-bg-layer-2); }
      .wsc-radio input { margin: 0; accent-color: var(--dsw-alias-brand-primary, #4d6bfe); }
      .wsc-radio-label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .wsc-badge {
        flex: none;
        padding: 0 4px;
        border-radius: 999px;
        color: var(--dsw-alias-label-secondary);
        background: var(--dsw-alias-bg-layer-2);
        font-size: 10px;
        line-height: 16px;
      }
      .wsc-new-row {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .wsc-input {
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        padding: 0 8px;
        color: var(--dsw-alias-label-primary);
        background: transparent;
        border: 1px solid var(--dsw-alias-border-l2);
        border-radius: var(--dsw-radius-sm, 5px);
        outline: none;
        font: inherit;
        font-size: 13px;
        line-height: 20px;
      }
      .wsc-input:focus { border-color: var(--dsw-alias-brand-primary, #4d6bfe); }
      .wsc-input:disabled { opacity: .55; }
      .wsc-modal-foot {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        padding: 12px 18px 16px;
        border-top: 1px solid var(--dsw-alias-border-l1);
      }
      .wsc-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        padding: 0 12px;
        color: var(--dsw-alias-label-primary);
        background: transparent;
        border: 1px solid var(--dsw-alias-border-l2);
        border-radius: var(--dsw-radius-md, 6px);
        font: inherit;
        font-size: 12px;
        line-height: 18px;
        cursor: pointer;
      }
      .wsc-btn:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-2); }
      .wsc-btn:focus-visible {
        outline: var(--dsw-focus-ring-width, 2px) solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
        outline-offset: -2px;
      }
      .wsc-btn:disabled { opacity: .5; cursor: default; }
      .wsc-btn-primary {
        color: #fff;
        background: var(--dsw-alias-brand-primary, #4d6bfe);
        border-color: var(--dsw-alias-brand-primary, #4d6bfe);
      }
      .wsc-btn-primary:hover:not(:disabled) { background: var(--dsw-alias-brand-primary, #4d6bfe); filter: brightness(1.06); }
      .wsc-btn-danger { color: var(--dsw-alias-state-error-primary); }
      .wsc-notice {
        padding: 8px 10px;
        color: var(--dsw-alias-label-secondary);
        background: var(--dsw-alias-bg-layer-2);
        border-radius: var(--dsw-radius-sm, 5px);
        font-size: 12px;
        line-height: 18px;
      }
      .wsc-error {
        color: var(--dsw-alias-state-error-primary);
        font-size: 12px;
        line-height: 18px;
      }
      .wsc-config {
        display: flex;
        flex-direction: column;
        gap: 14px;
        box-sizing: border-box;
        max-width: 760px;
        padding: 4px 0 8px;
        color: var(--dsw-alias-label-primary);
      }
      .wsc-config-intro {
        margin: 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 13px;
        line-height: 20px;
      }
      .wsc-config-section-title {
        margin: 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 18px;
        font-weight: 600;
      }
      .wsc-cat-list {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: var(--dsw-radius-lg, 10px);
      }
      .wsc-cat-row {
        display: flex;
        align-items: center;
        gap: 8px;
        box-sizing: border-box;
        min-height: 44px;
        padding: 6px 10px;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
      }
      .wsc-cat-row:last-child { border-bottom: 0; }
      .wsc-cat-order { display: flex; flex: none; gap: 2px; }
      .wsc-icon-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        padding: 0;
        color: var(--dsw-alias-label-secondary);
        background: transparent;
        border: 0;
        border-radius: var(--dsw-radius-xs, 4px);
        font: inherit;
        font-size: 13px;
        line-height: 1;
        cursor: pointer;
      }
      .wsc-icon-btn:hover:not(:disabled) { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-2); }
      .wsc-icon-btn:disabled { opacity: .35; cursor: default; }
      .wsc-cat-main {
        display: flex;
        flex: 1;
        align-items: center;
        gap: 8px;
        min-width: 0;
      }
      .wsc-cat-name {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        line-height: 20px;
      }
      .wsc-cat-count {
        flex: none;
        color: var(--dsw-alias-label-tertiary);
        font-size: 12px;
        line-height: 18px;
      }
      .wsc-cat-actions { display: flex; flex: none; gap: 2px; }
      .wsc-text-btn {
        padding: 4px 6px;
        color: var(--dsw-alias-label-secondary);
        background: transparent;
        border: 0;
        border-radius: var(--dsw-radius-xs, 4px);
        font: inherit;
        font-size: 12px;
        line-height: 18px;
        cursor: pointer;
      }
      .wsc-text-btn:hover:not(:disabled) { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-2); }
      .wsc-text-btn:disabled { opacity: .4; cursor: default; }
      .wsc-text-btn-danger { color: var(--dsw-alias-state-error-primary); }
      .wsc-cat-edit { display: flex; flex: 1; align-items: center; gap: 6px; min-width: 0; }
      .wsc-confirm {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        padding: 8px 10px;
        color: var(--dsw-alias-label-secondary);
        background: var(--dsw-alias-bg-layer-2);
        font-size: 12px;
        line-height: 18px;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
      }
      .wsc-add-row { display: flex; align-items: center; gap: 8px; }
      .wsc-add-row .wsc-input { max-width: 280px; }
      .wsc-config-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        min-height: 20px;
        color: var(--dsw-alias-label-tertiary);
        font-size: 12px;
        line-height: 18px;
      }
      .wsc-config-empty {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding: 20px;
        color: var(--dsw-alias-label-secondary);
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: var(--dsw-radius-lg, 10px);
        font-size: 13px;
        line-height: 20px;
      }
      .wsc-summary { color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; }
    `;

    function normalizeName(value) {
      return String(value ?? "")
        .replace(/\s+/g, " ")
        .trim();
    }

    function categoryName(value) {
      return normalizeName(value);
    }

    function validateCategoryName(name, categories, options = {}) {
      const value = categoryName(name);
      if (value.length === 0) return { ok: false, code: "empty" };
      if (value.length > 40) return { ok: false, code: "tooLong" };
      const lower = value.toLocaleLowerCase();
      const reserved = (options.reserved ?? [])
        .map((entry) => categoryName(entry).toLocaleLowerCase())
        .filter(Boolean);
      if (reserved.includes(lower)) return { ok: false, code: "reserved" };
      const excludeId = options.excludeId;
      for (const category of categories ?? []) {
        if (excludeId !== undefined && category.id === excludeId) continue;
        if (categoryName(category.name).toLocaleLowerCase() === lower) {
          return { ok: false, code: "duplicate" };
        }
      }
      return { ok: true, name: value };
    }

    function makeCategoryId() {
      try {
        if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
          return "c_" + globalThis.crypto.randomUUID();
        }
      } catch {
        /* fall through */
      }
      return "c_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
    }

    function normalizeCategories(input) {
      const seen = new Set();
      const result = [];
      if (!Array.isArray(input)) return result;
      for (const item of input) {
        if (item === null || typeof item !== "object") continue;
        const id = typeof item.id === "string" ? item.id : "";
        const name = categoryName(item.name);
        if (id.length === 0 || name.length === 0 || seen.has(id)) continue;
        seen.add(id);
        result.push({ id, name });
      }
      return result;
    }

    function normalizeAssignments(input, categories) {
      const valid = new Set(categories.map((category) => category.id));
      const result = {};
      if (input === null || typeof input !== "object" || Array.isArray(input)) return result;
      for (const [workspaceId, categoryId] of Object.entries(input)) {
        if (typeof workspaceId !== "string" || workspaceId.length === 0) continue;
        if (typeof categoryId !== "string" || !valid.has(categoryId)) continue;
        result[workspaceId] = categoryId;
      }
      return result;
    }

    function errorText(t, code) {
      switch (code) {
        case "empty":
          return t("error.nameRequired");
        case "tooLong":
          return t("error.nameTooLong");
        case "duplicate":
          return t("error.duplicateName");
        case "reserved":
          return t("error.reservedName");
        case "readOnly":
          return t("error.readOnly");
        case "unavailable":
          return t("error.unavailable");
        case "busy":
          return t("error.busy");
        case "invalid":
          return t("error.invalidName");
        default:
          return t("error.writeFailed");
      }
    }

    function rowRule(prefix, id) {
      const value = `${prefix}:${id}`.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return `[data-row-key="${value}"]`;
    }

    function computeHidden(items, assignments, categories, filter) {
      const categoryIds = new Set(categories.map((category) => category.id));
      const visible = new Set();
      const list = Array.isArray(items) ? items : [];
      for (const item of list) {
        const workspaceId = item.workspaceId;
        const assigned = assignments[workspaceId];
        const valid = typeof assigned === "string" && categoryIds.has(assigned);
        if (filter === null) visible.add(workspaceId);
        else if (filter === UNCATEGORIZED) {
          if (!valid) visible.add(workspaceId);
        } else if (valid && assigned === filter) {
          visible.add(workspaceId);
        }
      }
      const hidden = [];
      const hiddenSessions = new Set();
      for (const item of list) {
        if (visible.has(item.workspaceId)) continue;
        hidden.push(item.workspaceId);
        for (const sessionId of item.sessionIds ?? []) hiddenSessions.add(sessionId);
      }
      return { hidden, hiddenSessions: [...hiddenSessions], visibleCount: visible.size };
    }

    function createCategoryStore() {
      let form = null;
      let configForms = null;
      let unsubscribe = null;
      let snapshot = Object.freeze({
        status: "loading",
        writable: false,
        categories: [],
        assignments: {},
        saving: false,
        error: null,
      });
      const listeners = new Set();

      const notify = () => {
        for (const listener of [...listeners]) {
          try {
            listener();
          } catch {
            /* a listener must not break the others */
          }
        }
      };

      const set = (patch) => {
        snapshot = Object.freeze({ ...snapshot, ...patch });
        notify();
      };

      const derive = () => {
        if (form === null) return;
        let formSnapshot;
        try {
          formSnapshot = form.getSnapshot();
        } catch {
          return;
        }
        if (!formSnapshot || typeof formSnapshot !== "object") return;
        const value =
          formSnapshot.value !== null && typeof formSnapshot.value === "object" ? formSnapshot.value : {};
        const categories = normalizeCategories(value.categories);
        const assignments = normalizeAssignments(value.assignments, categories);
        let status = "loading";
        if (formSnapshot.status === "unavailable") status = "unavailable";
        else if (formSnapshot.status === "ready") status = formSnapshot.writable ? "ready" : "readonly";
        set({
          status,
          writable: formSnapshot.writable === true,
          categories,
          assignments,
        });
      };

      const attach = (forms) => {
        configForms = forms;
        const next = forms.get(ENTRY_ID);
        if (form === next) return () => {};
        unsubscribe?.();
        form = next;
        unsubscribe = form.subscribe(derive);
        derive();
        return () => {
          unsubscribe?.();
          unsubscribe = null;
          form = null;
        };
      };

      const retry = () => {
        try {
          configForms?.describe?.().ensure?.();
        } catch {
          /* nothing else to do */
        }
      };

      const write = async (operations) => {
        if (form === null) return { ok: false, code: "unavailable" };
        if (snapshot.status === "unavailable" || snapshot.status === "loading") {
          return { ok: false, code: "unavailable" };
        }
        if (!snapshot.writable) return { ok: false, code: "readOnly" };
        if (snapshot.saving) return { ok: false, code: "busy" };
        set({ saving: true, error: null });
        let ok = false;
        try {
          ok = await form.mutate(operations);
        } catch {
          ok = false;
        }
        set({ saving: false, error: ok ? null : "writeFailed" });
        return ok ? { ok: true } : { ok: false, code: "writeFailed" };
      };

      const addCategory = async (name, reserved = []) => {
        const validation = validateCategoryName(name, snapshot.categories, { reserved });
        if (!validation.ok) return validation;
        const next = [...snapshot.categories, { id: makeCategoryId(), name: validation.name }];
        return write([{ op: "set", path: ["categories"], value: next }]);
      };

      const renameCategory = async (id, name, reserved = []) => {
        const validation = validateCategoryName(name, snapshot.categories, {
          reserved,
          excludeId: id,
        });
        if (!validation.ok) return validation;
        const next = snapshot.categories.map((category) =>
          category.id === id ? { ...category, name: validation.name } : category,
        );
        return write([{ op: "set", path: ["categories"], value: next }]);
      };

      const deleteCategory = async (id) => {
        const nextCategories = snapshot.categories.filter((category) => category.id !== id);
        if (nextCategories.length === snapshot.categories.length) return { ok: true };
        const nextAssignments = { ...snapshot.assignments };
        for (const [workspaceId, categoryId] of Object.entries(nextAssignments)) {
          if (categoryId === id) delete nextAssignments[workspaceId];
        }
        return write([
          { op: "set", path: ["categories"], value: nextCategories },
          { op: "set", path: ["assignments"], value: nextAssignments },
        ]);
      };

      const moveCategory = async (id, delta) => {
        const index = snapshot.categories.findIndex((category) => category.id === id);
        if (index < 0) return { ok: false, code: "invalid" };
        const target = index + delta;
        if (target < 0 || target >= snapshot.categories.length) return { ok: true };
        const next = [...snapshot.categories];
        const [moved] = next.splice(index, 1);
        next.splice(target, 0, moved);
        return write([{ op: "set", path: ["categories"], value: next }]);
      };

      const setWorkspaceCategory = async (workspaceId, categoryId) => {
        if (typeof workspaceId !== "string" || workspaceId.length === 0) {
          return { ok: false, code: "invalid" };
        }
        if (categoryId !== null && !snapshot.categories.some((category) => category.id === categoryId)) {
          return { ok: false, code: "invalid" };
        }
        const next = { ...snapshot.assignments };
        if (categoryId === null) delete next[workspaceId];
        else next[workspaceId] = categoryId;
        return write([{ op: "set", path: ["assignments"], value: next }]);
      };

      const createCategoryAndAssign = async (name, workspaceId, reserved = []) => {
        const validation = validateCategoryName(name, snapshot.categories, { reserved });
        if (!validation.ok) return validation;
        if (typeof workspaceId !== "string" || workspaceId.length === 0) {
          return { ok: false, code: "invalid" };
        }
        const category = { id: makeCategoryId(), name: validation.name };
        const nextCategories = [...snapshot.categories, category];
        const nextAssignments = { ...snapshot.assignments, [workspaceId]: category.id };
        return write([
          { op: "set", path: ["categories"], value: nextCategories },
          { op: "set", path: ["assignments"], value: nextAssignments },
        ]);
      };

      return {
        subscribe: (listener) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
        getSnapshot: () => snapshot,
        attach,
        retry,
        addCategory,
        renameCategory,
        deleteCategory,
        moveCategory,
        setWorkspaceCategory,
        createCategoryAndAssign,
      };
    }

    function readStoredFilter() {
      try {
        const raw = window.localStorage.getItem(FILTER_STORAGE_KEY);
        if (raw === null || raw === "" || raw === "null" || raw === "__all__") return null;
        return raw;
      } catch {
        return null;
      }
    }

    function createFilterStore() {
      let value = readStoredFilter();
      const listeners = new Set();
      const notify = () => {
        for (const listener of [...listeners]) {
          try {
            listener();
          } catch {
            /* ignore */
          }
        }
      };
      return {
        subscribe: (listener) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
        getSnapshot: () => value,
        set: (next) => {
          const normalized = next === undefined ? null : next;
          if (normalized === value) return;
          value = normalized;
          try {
            if (value === null) window.localStorage.removeItem(FILTER_STORAGE_KEY);
            else window.localStorage.setItem(FILTER_STORAGE_KEY, value);
          } catch {
            /* the filter still works in memory */
          }
          notify();
        },
      };
    }

    function createUiStore() {
      let snapshot = Object.freeze({ modal: null });
      const listeners = new Set();
      const set = (patch) => {
        snapshot = Object.freeze({ ...snapshot, ...patch });
        for (const listener of [...listeners]) {
          try {
            listener();
          } catch {
            /* ignore */
          }
        }
      };
      return {
        subscribe: (listener) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
        getSnapshot: () => snapshot,
        openCategoryModal: (workspaceId, displayTitle) => {
          set({ modal: { workspaceId, displayTitle } });
        },
        closeCategoryModal: () => {
          set({ modal: null });
        },
      };
    }

    function useStoreSnapshot(store) {
      return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
    }

    function useEmptyWorkspaces(selector) {
      return selector({ items: [] });
    }

    function useWorkspaceItems(useWorkspaces) {
      const hook = typeof useWorkspaces === "function" ? useWorkspaces : useEmptyWorkspaces;
      return hook((state) => (state && Array.isArray(state.items) ? state.items : []));
    }

    function useHeaderProbe() {
      const [layout, setLayout] = useState(null);
      useEffect(() => {
        let current = null;
        let lastKey = "";
        let disposed = false;
        let frame = 0;
        let observer = null;
        let observedLabel = null;

        const clear = () => {
          if (current === null) return;
          current = null;
          lastKey = "";
          setLayout(null);
        };

        const measure = () => {
          if (disposed) return;
          try {
            const candidates = Array.from(
              document.querySelectorAll('[class*="_sectionHeader"] > span[class*="_sectionLabel"]'),
            );
            let label = null;
            for (const candidate of candidates) {
              const text = (candidate.textContent ?? "").trim();
              if (!WORKSPACE_SECTION_LABELS.has(text) && !SESSION_SECTION_LABELS.has(text)) continue;
              const rect = candidate.getBoundingClientRect();
              if (rect.width < 4 || rect.height < 4) continue;
              label = candidate;
              break;
            }
            if (label === null) {
              clear();
              return;
            }
            const rect = label.getBoundingClientRect();
            const text = (label.textContent ?? "").trim();
            const isWorkspace = WORKSPACE_SECTION_LABELS.has(text);
            const isSession = SESSION_SECTION_LABELS.has(text);
            const hasWorkspaceRows = isWorkspace
              ? document.querySelector('[data-row-key^="workspace:"]') !== null
              : false;
            const mode = isWorkspace && hasWorkspaceRows ? "workspace" : isSession ? "flat" : "none";
            const parent = label.parentElement;
            const headerRect = parent ? parent.getBoundingClientRect() : rect;
            const nextSibling = label.nextElementSibling;
            const nextRect = nextSibling ? nextSibling.getBoundingClientRect() : null;
            const searchLeft = nextRect && nextRect.width > 0 ? nextRect.left : rect.right + 140;
            const computed = window.getComputedStyle(label);
            const key = [
              mode,
              rect.left,
              rect.top,
              rect.width,
              rect.height,
              searchLeft,
              headerRect.bottom,
              computed.fontSize,
              computed.fontWeight,
              computed.lineHeight,
              computed.letterSpacing,
              computed.color,
            ].join("|");
            if (key === lastKey) return;
            lastKey = key;
            current = {
              mode,
              left: rect.left,
              right: rect.right,
              top: rect.top,
              width: rect.width,
              height: rect.height,
              searchLeft,
              headerBottom: headerRect.bottom,
              available: Math.max(0, searchLeft - rect.left - 8),
              fontSize: computed.fontSize,
              fontWeight: computed.fontWeight,
              lineHeight: computed.lineHeight,
              letterSpacing: computed.letterSpacing,
              color: computed.color,
            };
            setLayout(current);
          } catch {
            clear();
          }
        };

        const schedule = () => {
          if (disposed || frame !== 0) return;
          frame = window.requestAnimationFrame(() => {
            frame = 0;
            measure();
          });
        };

        const observe = () => {
          if (disposed) return;
          try {
            if (observedLabel === null || !observedLabel.isConnected) {
              const candidates = Array.from(
                document.querySelectorAll('[class*="_sectionHeader"] > span[class*="_sectionLabel"]'),
              );
              observedLabel =
                candidates.find((candidate) =>
                  WORKSPACE_SECTION_LABELS.has((candidate.textContent ?? "").trim()),
                ) ?? null;
              if (observedLabel !== null) {
                observer?.disconnect();
                observer = new ResizeObserver(schedule);
                observer.observe(observedLabel);
                if (observedLabel.parentElement) observer.observe(observedLabel.parentElement);
              }
            }
          } catch {
            /* the polling measure below remains the fallback */
          }
        };

        schedule();
        observe();
        const interval = window.setInterval(measure, 400);
        const observeInterval = window.setInterval(observe, 1000);
        window.addEventListener("resize", schedule);
        document.addEventListener("scroll", schedule, true);
        return () => {
          disposed = true;
          window.clearInterval(interval);
          window.clearInterval(observeInterval);
          window.cancelAnimationFrame(frame);
          window.removeEventListener("resize", schedule);
          document.removeEventListener("scroll", schedule, true);
          try {
            observer?.disconnect();
          } catch {
            /* ignore */
          }
        };
      }, []);
      return layout;
    }

    function useFilterStyles(enabled, hidden, hiddenSessions) {
      useEffect(() => {
        const style = document.createElement("style");
        style.dataset.pluginCss = "dsh-workspace-category-filter";
        document.head.appendChild(style);
        return () => {
          style.remove();
          document.documentElement.removeAttribute("data-wsc-filter");
        };
      }, []);

      useEffect(() => {
        const style = document.querySelector(
          'style[data-plugin-css="dsh-workspace-category-filter"]',
        );
        if (!style) return;
        if (!enabled) {
          style.textContent = "";
          document.documentElement.removeAttribute("data-wsc-filter");
          return;
        }
        const selectors = [];
        for (const id of hidden) selectors.push(rowRule("workspace", id));
        for (const id of hidden) selectors.push(rowRule("overflow", id));
        for (const id of hiddenSessions) selectors.push(rowRule("session", id));
        style.textContent =
          selectors.length > 0 ? `${selectors.join(",")}{display:none !important;}` : "";
        document.documentElement.setAttribute("data-wsc-filter", "active");
      }, [enabled, hidden, hiddenSessions]);
    }

    function Chevron({ open }) {
      return h(
        "svg",
        {
          width: 10,
          height: 10,
          viewBox: "0 0 10 10",
          fill: "none",
          "aria-hidden": "true",
          style: {
            flex: "none",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform .15s ease",
          },
        },
        h("path", {
          d: "M1.7 3.2 5 6.6 8.3 3.2Z",
          fill: "currentColor",
        }),
      );
    }

    function Check() {
      return h(
        "svg",
        { width: 12, height: 12, viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true" },
        h("path", {
          d: "m2.2 6.2 2.4 2.4 5.2-5.2",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
      );
    }

    function CategoryMenu({ anchor, activeValue, categories, t, onSelect, onClose, triggerRef }) {
      const menuRef = useRef(null);
      const itemRefs = useRef([]);
      const items = useMemo(
        () => [
          { key: "__all__", label: t("menu.all"), value: null },
          ...categories.map((category) => ({
            key: category.id,
            label: category.name,
            value: category.id,
          })),
          {
            key: "__uncategorized__",
            label: t("menu.uncategorized"),
            value: UNCATEGORIZED,
            separatorBefore: true,
          },
        ],
        [categories, t],
      );
      const initialIndex = Math.max(
        0,
        items.findIndex((item) =>
          item.value === activeValue || (item.value === null && activeValue === null),
        ),
      );
      const [activeIndex, setActiveIndex] = useState(initialIndex);

      useEffect(() => {
        const element = itemRefs.current[initialIndex];
        if (element) element.focus();
      }, [initialIndex]);

      useEffect(() => {
        if (activeIndex >= items.length) setActiveIndex(Math.max(0, items.length - 1));
      }, [activeIndex, items.length]);

      useEffect(() => {
        const onPointerDown = (event) => {
          if (menuRef.current?.contains(event.target)) return;
          if (triggerRef?.current?.contains(event.target)) return;
          onClose();
        };
        const onViewport = (event) => {
          if (event && menuRef.current?.contains(event.target)) return;
          onClose();
        };
        document.addEventListener("pointerdown", onPointerDown, true);
        window.addEventListener("resize", onViewport);
        window.addEventListener("scroll", onViewport, true);
        return () => {
          document.removeEventListener("pointerdown", onPointerDown, true);
          window.removeEventListener("resize", onViewport);
          window.removeEventListener("scroll", onViewport, true);
        };
      }, [onClose, triggerRef]);

      const focusIndex = (index) => {
        const next = Math.max(0, Math.min(items.length - 1, index));
        setActiveIndex(next);
        itemRefs.current[next]?.focus();
      };

      const onKeyDown = (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          focusIndex(activeIndex + 1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          focusIndex(activeIndex - 1);
        } else if (event.key === "Home") {
          event.preventDefault();
          focusIndex(0);
        } else if (event.key === "End") {
          event.preventDefault();
          focusIndex(items.length - 1);
        } else if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        } else if (event.key === "Tab") {
          onClose();
        }
      };

      const width = 220;
      const estimatedHeight = Math.min(360, items.length * 32 + 12);
      const left = Math.max(8, Math.min(anchor.left, window.innerWidth - width - 8));
      let top = anchor.bottom + 6;
      if (top + estimatedHeight > window.innerHeight - 8) {
        top = Math.max(8, anchor.top - estimatedHeight - 6);
      }

      return ReactDOM.createPortal(
        h(
          "div",
          {
            ref: menuRef,
            className: "wsc-menu",
            role: "menu",
            "aria-label": t("menu.filterAria"),
            style: { left, top, width, maxHeight: Math.min(360, window.innerHeight - 16) },
            onKeyDown,
          },
          items.map((item, index) => {
            const selected =
              item.value === activeValue || (item.value === null && activeValue === null);
            return h(
              React.Fragment,
              { key: item.key },
              item.separatorBefore ? h("div", { className: "wsc-menu-sep" }) : null,
              h(
                "button",
                {
                  ref: (element) => {
                    itemRefs.current[index] = element;
                  },
                  type: "button",
                  role: "menuitemradio",
                  "aria-checked": selected,
                  tabIndex: index === activeIndex ? 0 : -1,
                  className: "wsc-menu-item",
                  onMouseEnter: () => setActiveIndex(index),
                  onClick: () => onSelect(item.value),
                },
                h("span", { className: "wsc-menu-check" }, selected ? h(Check) : null),
                h("span", { className: "wsc-menu-label" }, item.label),
              ),
            );
          }),
        ),
        document.body,
      );
    }

    function CategoryModal({ modal, store, t, onClose }) {
      const snapshot = useStoreSnapshot(store);
      const [selected, setSelected] = useState(undefined);
      const [pending, setPending] = useState([]);
      const [newName, setNewName] = useState("");
      const [error, setError] = useState(null);
      const [savingLocal, setSavingLocal] = useState(false);
      const initialized = useRef(false);
      const panelRef = useRef(null);
      const returnFocusRef = useRef(null);
      const titleId = useId();

      useEffect(() => {
        if (initialized.current) return;
        if (snapshot.status !== "ready" && snapshot.status !== "readonly") return;
        const assigned = snapshot.assignments[modal.workspaceId];
        const valid =
          typeof assigned === "string" &&
          snapshot.categories.some((category) => category.id === assigned);
        setSelected(valid ? assigned : UNCATEGORIZED);
        initialized.current = true;
      }, [snapshot.status, snapshot.assignments, snapshot.categories, modal.workspaceId]);

      useEffect(() => {
        if (selected === undefined || selected === UNCATEGORIZED) return;
        if (pending.some((category) => category.id === selected)) return;
        if (!snapshot.categories.some((category) => category.id === selected)) {
          setSelected(UNCATEGORIZED);
        }
      }, [selected, snapshot.categories, pending]);

      useEffect(() => {
        returnFocusRef.current = document.activeElement;
        const panel = panelRef.current;
        const onKeyDown = (event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            onClose();
            return;
          }
          if (event.key !== "Tab" || panel === null) return;
          const focusable = Array.from(
            panel.querySelectorAll(
              'button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])',
            ),
          ).filter((element) => element.offsetParent !== null || element === document.activeElement);
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        };
        document.addEventListener("keydown", onKeyDown, true);
        const timer = window.setTimeout(() => panel?.focus(), 0);
        return () => {
          document.removeEventListener("keydown", onKeyDown, true);
          window.clearTimeout(timer);
          try {
            returnFocusRef.current?.focus?.();
          } catch {
            /* ignore */
          }
        };
      }, [onClose]);

      const busy = savingLocal || snapshot.saving;
      const readOnly = snapshot.status === "readonly" || snapshot.status === "unavailable";
      const categories = [...snapshot.categories, ...pending];
      const reserved = [t("menu.uncategorized"), t("menu.all")];

      const addPending = () => {
        const validation = validateCategoryName(newName, categories, { reserved });
        if (!validation.ok) {
          setError(validation.code);
          return;
        }
        const category = { id: makeCategoryId(), name: validation.name, pending: true };
        setPending((current) => [...current, category]);
        setSelected(category.id);
        setNewName("");
        setError(null);
      };

      const save = async () => {
        if (selected === undefined) return;
        setError(null);
        setSavingLocal(true);
        let result;
        if (selected === UNCATEGORIZED) {
          result = await store.setWorkspaceCategory(modal.workspaceId, null);
        } else {
          const pendingCategory = pending.find((category) => category.id === selected);
          if (pendingCategory) {
            result = await store.createCategoryAndAssign(
              pendingCategory.name,
              modal.workspaceId,
              reserved,
            );
          } else {
            result = await store.setWorkspaceCategory(modal.workspaceId, selected);
          }
        }
        setSavingLocal(false);
        if (result.ok) onClose();
        else setError(result.code);
      };

      const renderNotice = () => {
        if (snapshot.status === "unavailable") {
          return h("div", { className: "wsc-notice" }, t("modal.unavailable"));
        }
        if (readOnly) {
          return h("div", { className: "wsc-notice" }, t("modal.readOnly"));
        }
        return null;
      };

      const body =
        selected === undefined && snapshot.status === "loading"
          ? h("div", { className: "wsc-notice" }, t("modal.loading"))
          : h(
              React.Fragment,
              null,
              h(
                "div",
                { className: "wsc-radio-list", role: "radiogroup", "aria-label": t("modal.category") },
                categories.map((category) =>
                  h(
                    "label",
                    { key: category.id, className: "wsc-radio" },
                    h("input", {
                      type: "radio",
                      name: "wsc-category",
                      value: category.id,
                      checked: selected === category.id,
                      disabled: busy || readOnly,
                      onChange: () => setSelected(category.id),
                    }),
                    h("span", { className: "wsc-radio-label" }, category.name),
                    category.pending ? h("span", { className: "wsc-badge" }, t("modal.newBadge")) : null,
                  ),
                ),
                h(
                  "label",
                  { className: "wsc-radio" },
                  h("input", {
                    type: "radio",
                    name: "wsc-category",
                    value: UNCATEGORIZED,
                    checked: selected === UNCATEGORIZED,
                    disabled: busy || readOnly,
                    onChange: () => setSelected(UNCATEGORIZED),
                  }),
                  h("span", { className: "wsc-radio-label" }, t("menu.uncategorized")),
                ),
              ),
              h(
                "div",
                { className: "wsc-new-row" },
                h("input", {
                  className: "wsc-input",
                  value: newName,
                  placeholder: t("modal.newPlaceholder"),
                  disabled: busy || readOnly,
                  onChange: (event) => {
                    setNewName(event.target.value);
                    setError(null);
                  },
                  onKeyDown: (event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addPending();
                    } else if (event.key === "Escape") {
                      setNewName("");
                    }
                  },
                }),
                h(
                  "button",
                  {
                    type: "button",
                    className: "wsc-btn",
                    disabled: busy || readOnly || newName.trim().length === 0,
                    onClick: addPending,
                  },
                  t("modal.create"),
                ),
              ),
              renderNotice(),
              error ? h("div", { className: "wsc-error" }, errorText(t, error)) : null,
            );

      return ReactDOM.createPortal(
        h(
          "div",
          {
            className: "wsc-modal-backdrop",
            onMouseDown: (event) => {
              if (event.target === event.currentTarget && !busy) onClose();
            },
          },
          h(
            "div",
            {
              ref: panelRef,
              className: "wsc-modal",
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": titleId,
              tabIndex: -1,
            },
            h(
              "div",
              { className: "wsc-modal-head" },
              h("h2", { id: titleId, className: "wsc-modal-title" }, t("modal.title")),
              h(
                "div",
                { className: "wsc-modal-sub" },
                t("modal.workspace", { name: modal.displayTitle || modal.workspaceId }),
              ),
            ),
            h("div", { className: "wsc-modal-body" }, body),
            h(
              "div",
              { className: "wsc-modal-foot" },
              h(
                "button",
                {
                  type: "button",
                  className: "wsc-btn",
                  disabled: busy,
                  onClick: onClose,
                },
                t("modal.cancel"),
              ),
              h(
                "button",
                {
                  type: "button",
                  className: "wsc-btn wsc-btn-primary",
                  disabled: busy || readOnly || selected === undefined,
                  onClick: save,
                },
                t("modal.save"),
              ),
            ),
          ),
        ),
        document.body,
      );
    }

    function HeaderControl({ t, store, filterStore, uiStore, useWorkspaces }) {
      const snapshot = useStoreSnapshot(store);
      const filter = useStoreSnapshot(filterStore);
      const ui = useStoreSnapshot(uiStore);
      const items = useWorkspaceItems(useWorkspaces);
      const layout = useHeaderProbe();
      const [menuOpen, setMenuOpen] = useState(false);
      const [anchor, setAnchor] = useState(null);
      const triggerRef = useRef(null);

      const ready = snapshot.status === "ready" || snapshot.status === "readonly";
      const active =
        filter !== null &&
        filter !== undefined &&
        (filter === UNCATEGORIZED ||
          snapshot.categories.some((category) => category.id === filter));
      const activeCategory =
        active && filter !== UNCATEGORIZED
          ? snapshot.categories.find((category) => category.id === filter)
          : null;
      const activeName = active
        ? filter === UNCATEGORIZED
          ? t("menu.uncategorized")
          : activeCategory?.name ?? t("menu.all")
        : null;
      const enabled = ready && layout?.mode === "workspace" && layout.available >= 44;

      useEffect(() => {
        if (!ready) return;
        if (filter === null || filter === UNCATEGORIZED) return;
        if (!snapshot.categories.some((category) => category.id === filter)) {
          filterStore.set(null);
        }
      }, [ready, filter, snapshot.categories, filterStore]);

      useEffect(() => {
        if (snapshot.status === "unavailable" && filter !== null) filterStore.set(null);
      }, [snapshot.status, filter, filterStore]);

      useEffect(() => {
        if (!enabled && menuOpen) {
          setMenuOpen(false);
          setAnchor(null);
        }
      }, [enabled, menuOpen]);

      const hiddenInfo = useMemo(
        () => computeHidden(items, snapshot.assignments, snapshot.categories, filter),
        [items, snapshot.assignments, snapshot.categories, filter],
      );
      useFilterStyles(enabled && active, hiddenInfo.hidden, hiddenInfo.hiddenSessions);

      const closeMenu = useCallback(() => {
        setMenuOpen(false);
        setAnchor(null);
        window.requestAnimationFrame(() => {
          try {
            triggerRef.current?.focus();
          } catch {
            /* ignore */
          }
        });
      }, []);

      const closeModal = useCallback(() => {
        uiStore.closeCategoryModal();
      }, [uiStore]);

      const openMenu = () => {
        const element = triggerRef.current;
        if (!element) return;
        const rect = element.getBoundingClientRect();
        setAnchor({
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
        });
        setMenuOpen(true);
      };

      const selectFilter = (value) => {
        filterStore.set(value);
        closeMenu();
      };

      const modalNode = ui.modal
        ? h(CategoryModal, {
            key: ui.modal.workspaceId,
            modal: ui.modal,
            store,
            t,
            onClose: closeModal,
          })
        : null;

      if (!enabled) return modalNode;

      const activeStyle = active
        ? {
            display: "flex",
            alignItems: "center",
            gap: 2,
            height: Math.max(20, layout.height),
            maxWidth: Math.max(48, layout.available),
            minWidth: 0,
            padding: "0 2px",
            borderRadius: 4,
            color: "var(--dsw-alias-brand-primary, #4d6bfe)",
            fontSize: layout.fontSize,
            fontWeight: layout.fontWeight,
            lineHeight: layout.lineHeight,
            letterSpacing: layout.letterSpacing,
          }
        : {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
            padding: 0,
            borderRadius: 4,
            color: layout.color,
          };

      return h(
        React.Fragment,
        null,
        h(
          "div",
          {
            style: {
              position: "fixed",
              left: active ? layout.left - 2 : layout.right + 4,
              top: active ? layout.top : layout.top + Math.max(0, (layout.height - 20) / 2),
              height: active ? Math.max(20, layout.height) : 20,
              maxWidth: active ? Math.max(48, layout.available) : 20,
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
              zIndex: 30,
            },
          },
          h(
            "button",
            {
              ref: triggerRef,
              type: "button",
              className: "wsc-trigger",
              "data-active": active ? "true" : "false",
              style: activeStyle,
              "aria-haspopup": "menu",
              "aria-expanded": menuOpen,
              "aria-label": active
                ? t("menu.activeAria", { name: activeName })
                : t("menu.filterAria"),
              title: active ? t("menu.activeAria", { name: activeName }) : t("menu.filterAria"),
              onClick: () => {
                if (menuOpen) closeMenu();
                else openMenu();
              },
            },
            active ? h("span", { className: "wsc-label" }, activeName) : null,
            h(Chevron, { open: menuOpen }),
          ),
        ),
        menuOpen && anchor
          ? h(CategoryMenu, {
              anchor,
              activeValue: filter,
              categories: snapshot.categories,
              t,
              onSelect: selectFilter,
              onClose: closeMenu,
              triggerRef,
            })
          : null,
        modalNode,
      );
    }

    function ConfigPage({ t, store, view, useWorkspaces }) {
      const snapshot = useStoreSnapshot(store);
      const items = useWorkspaceItems(useWorkspaces);
      const [editingId, setEditingId] = useState(null);
      const [editName, setEditName] = useState("");
      const [editError, setEditError] = useState(null);
      const [confirmId, setConfirmId] = useState(null);
      const [newName, setNewName] = useState("");
      const [addError, setAddError] = useState(null);
      const [actionError, setActionError] = useState(null);

      const reserved = [t("menu.uncategorized"), t("menu.all")];
      const categoryIds = new Set(snapshot.categories.map((category) => category.id));
      const countFor = (id) =>
        items.filter((workspace) => snapshot.assignments[workspace.workspaceId] === id).length;
      const assignedCount = items.filter((workspace) => {
        const categoryId = snapshot.assignments[workspace.workspaceId];
        return typeof categoryId === "string" && categoryIds.has(categoryId);
      }).length;
      const busy = snapshot.saving;
      const readOnly = snapshot.status === "readonly" || snapshot.status === "unavailable";

      if (view === "summary") {
        if (snapshot.status === "loading") {
          return h("span", { className: "wsc-summary" }, t("config.summaryLoading"));
        }
        if (snapshot.status === "unavailable") {
          return h("span", { className: "wsc-summary" }, t("config.summaryUnavailable"));
        }
        return h(
          "span",
          { className: "wsc-summary" },
          t("config.summary", {
            categories: snapshot.categories.length,
            workspaces: assignedCount,
          }),
        );
      }

      if (snapshot.status === "loading") {
        return h(
          "div",
          { className: "wsc-config" },
          h("div", { className: "wsc-config-empty" }, t("config.loading")),
        );
      }

      if (snapshot.status === "unavailable") {
        return h(
          "div",
          { className: "wsc-config" },
          h(
            "div",
            { className: "wsc-config-empty" },
            h("span", null, t("config.unavailable")),
            h(
              "button",
              {
                type: "button",
                className: "wsc-btn",
                onClick: () => store.retry(),
              },
              t("config.retry"),
            ),
          ),
        );
      }

      const startEdit = (category) => {
        setEditingId(category.id);
        setEditName(category.name);
        setEditError(null);
        setConfirmId(null);
      };

      const cancelEdit = () => {
        setEditingId(null);
        setEditName("");
        setEditError(null);
      };

      const commitEdit = async (category) => {
        const result = await store.renameCategory(category.id, editName, reserved);
        if (result.ok) {
          cancelEdit();
          setActionError(null);
        } else {
          setEditError(result.code);
        }
      };

      const removeCategory = async (category) => {
        const result = await store.deleteCategory(category.id);
        if (result.ok) {
          setConfirmId(null);
          setActionError(null);
        } else {
          setActionError(result.code);
        }
      };

      const addCategory = async () => {
        const result = await store.addCategory(newName, reserved);
        if (result.ok) {
          setNewName("");
          setAddError(null);
          setActionError(null);
        } else {
          setAddError(result.code);
        }
      };

      const moveCategory = async (category, delta) => {
        const result = await store.moveCategory(category.id, delta);
        if (result.ok) setActionError(null);
        else setActionError(result.code);
      };

      const statusText = busy
        ? t("config.saving")
        : actionError || snapshot.error
          ? errorText(t, actionError || snapshot.error)
          : t("config.savedHint");

      return h(
        "div",
        { className: "wsc-config" },
        h("p", { className: "wsc-config-intro" }, t("config.description")),
        readOnly ? h("div", { className: "wsc-notice" }, t("config.readOnly")) : null,
        h("h3", { className: "wsc-config-section-title" }, t("config.categories")),
        snapshot.categories.length === 0
          ? h("div", { className: "wsc-config-empty" }, t("config.empty"))
          : h(
              "div",
              { className: "wsc-cat-list" },
              snapshot.categories.map((category, index) =>
                h(
                  React.Fragment,
                  { key: category.id },
                  h(
                    "div",
                    { className: "wsc-cat-row" },
                    h(
                      "div",
                      { className: "wsc-cat-order" },
                      h(
                        "button",
                        {
                          type: "button",
                          className: "wsc-icon-btn",
                          title: t("config.up"),
                          "aria-label": t("config.up"),
                          disabled: busy || readOnly || index === 0,
                          onClick: () => moveCategory(category, -1),
                        },
                        "↑",
                      ),
                      h(
                        "button",
                        {
                          type: "button",
                          className: "wsc-icon-btn",
                          title: t("config.down"),
                          "aria-label": t("config.down"),
                          disabled:
                            busy || readOnly || index === snapshot.categories.length - 1,
                          onClick: () => moveCategory(category, 1),
                        },
                        "↓",
                      ),
                    ),
                    editingId === category.id
                      ? h(
                          "div",
                          { className: "wsc-cat-edit" },
                          h("input", {
                            className: "wsc-input",
                            value: editName,
                            placeholder: t("config.renamePlaceholder"),
                            disabled: busy,
                            onChange: (event) => {
                              setEditName(event.target.value);
                              setEditError(null);
                            },
                            onKeyDown: (event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                commitEdit(category);
                              } else if (event.key === "Escape") {
                                cancelEdit();
                              }
                            },
                          }),
                          h(
                            "button",
                            {
                              type: "button",
                              className: "wsc-btn",
                              disabled: busy,
                              onClick: () => commitEdit(category),
                            },
                            t("config.save"),
                          ),
                          h(
                            "button",
                            {
                              type: "button",
                              className: "wsc-text-btn",
                              disabled: busy,
                              onClick: cancelEdit,
                            },
                            t("config.cancel"),
                          ),
                        )
                      : h(
                          "div",
                          { className: "wsc-cat-main" },
                          h("span", { className: "wsc-cat-name" }, category.name),
                          h(
                            "span",
                            { className: "wsc-cat-count" },
                            t("config.workspaceCount", { n: countFor(category.id) }),
                          ),
                        ),
                    editingId === category.id
                      ? null
                      : h(
                          "div",
                          { className: "wsc-cat-actions" },
                          h(
                            "button",
                            {
                              type: "button",
                              className: "wsc-text-btn",
                              disabled: busy || readOnly,
                              onClick: () => startEdit(category),
                            },
                            t("config.rename"),
                          ),
                          h(
                            "button",
                            {
                              type: "button",
                              className: "wsc-text-btn wsc-text-btn-danger",
                              disabled: busy || readOnly,
                              onClick: () => {
                                setConfirmId(category.id);
                                setEditingId(null);
                              },
                            },
                            t("config.delete"),
                          ),
                        ),
                  ),
                  editingId === category.id && editError
                    ? h("div", { className: "wsc-error", style: { padding: "0 10px 8px" } }, errorText(t, editError))
                    : null,
                  confirmId === category.id
                    ? h(
                        "div",
                        { className: "wsc-confirm" },
                        h(
                          "span",
                          null,
                          t("config.deleteWarning", { n: countFor(category.id) }),
                        ),
                        h(
                          "button",
                          {
                            type: "button",
                            className: "wsc-btn wsc-btn-danger",
                            disabled: busy,
                            onClick: () => removeCategory(category),
                          },
                          t("config.confirmDelete"),
                        ),
                        h(
                          "button",
                          {
                            type: "button",
                            className: "wsc-text-btn",
                            disabled: busy,
                            onClick: () => setConfirmId(null),
                          },
                          t("config.cancel"),
                        ),
                      )
                    : null,
                ),
              ),
            ),
        h(
          "div",
          { className: "wsc-add-row" },
          h("input", {
            className: "wsc-input",
            value: newName,
            placeholder: t("config.addPlaceholder"),
            disabled: busy || readOnly,
            onChange: (event) => {
              setNewName(event.target.value);
              setAddError(null);
            },
            onKeyDown: (event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addCategory();
              }
            },
          }),
          h(
            "button",
            {
              type: "button",
              className: "wsc-btn wsc-btn-primary",
              disabled: busy || readOnly || newName.trim().length === 0,
              onClick: addCategory,
            },
            t("config.add"),
          ),
        ),
        addError ? h("div", { className: "wsc-error" }, errorText(t, addError)) : null,
        h("div", { className: "wsc-config-foot" }, h("span", null, statusText)),
      );
    }

    function CategoryIcon() {
      return h(
        "svg",
        { width: 14, height: 14, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" },
        h("path", {
          d: "M2.2 4.9c0-.8.6-1.4 1.4-1.4h2.1c.3 0 .6.1.8.3l.7.7h5.2c.8 0 1.4.6 1.4 1.4v5.2c0 .8-.6 1.4-1.4 1.4H3.6c-.8 0-1.4-.6-1.4-1.4V4.9Z",
          stroke: "currentColor",
          strokeWidth: "1.2",
          strokeLinejoin: "round",
        }),
        h("path", {
          d: "M5.2 8h5.6M5.2 10.3h3.6",
          stroke: "currentColor",
          strokeWidth: "1.2",
          strokeLinecap: "round",
        }),
      );
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), "workspace-category: locale");

      const t = ctx.locale.bind(NS);
      const store = createCategoryStore();
      const filterStore = createFilterStore();
      const uiStore = createUiStore();

      ctx.effect(() => store.attach(ctx.configForms), "workspace-category: configuration form");

      ctx.effect(() => {
        const style = document.createElement("style");
        style.dataset.pluginCss = "dsh-workspace-category";
        style.textContent = CSS;
        document.head.appendChild(style);
        return () => style.remove();
      }, "workspace-category: styles");

      ctx.slots.inject("shell.overlay", () =>
        ctx.slots.register(
          {
            name: "shell.overlay",
            id: "workspace-category.header",
            order: 50,
            locale: NS,
            inject: () => ({ store, filterStore, uiStore }),
          },
          HeaderControl,
        ),
      );

      ctx.slots.inject("contextMenu.icon", () =>
        ctx.slots.register(
          {
            name: "contextMenu.icon",
            key: ICON_KEY,
            locale: NS,
          },
          CategoryIcon,
        ),
      );

      ctx.slots.inject("plugins.row.config", () =>
        ctx.slots.register(
          {
            name: "plugins.row.config",
            key: CONFIG_KEY,
            locale: NS,
            inject: () => ({ store }),
          },
          ConfigPage,
        ),
      );

      ctx.effect(
        () =>
          ctx.contextMenus.register({
            id: "workspace.category",
            target: "workspace",
            order: 250,
            resolve: ({ workspaceId, displayTitle }) => {
              const status = store.getSnapshot().status;
              if (status !== "ready" && status !== "readonly") return [];
              return [
                {
                  id: "set-category",
                  label: t("menu.category"),
                  icon: { key: ICON_KEY },
                  run: () => uiStore.openCategoryModal(workspaceId, displayTitle),
                },
              ];
            },
          }),
        "workspace-category: workspace menu action",
      );
    }

    return { inject: ["slots", "locale", "configForms", "contextMenus"], apply };
  },
});
