# dsh-workspace-category

给 DSH 侧栏的**工作区**（项目）分组，并按分类筛选。
Group workspaces into categories in the DSH sidebar, and filter the sidebar by category.

[中文](#中文) · [English](#english)

---

## 中文

### 功能

- **分类菜单**：侧栏「工作区」标题右侧出现倒三角按钮，点开就是分类菜单。分类按配置顺序排列，**「未分类」始终排在最后**，最上面是「全部工作区」（清除筛选）。支持方向键选择、回车确认、Esc 关闭。
- **按分类筛选**：选中一个分类后，标题变成分类名并显示为主题色；不属于该分类的工作区**连同它下面的会话**一起从侧栏隐藏。
- **从工作区设置分类**：工作区行右侧「…」菜单里多一项「分类设置」，弹窗里可以改分类，也可以当场新建分类再保存。
- **插件配置页**：Plugins 列表里本插件那一行 → **Configure**。支持新增分类、重命名、删除（会提示该分类下有几个工作区将回到「未分类」）、上移 / 下移调整顺序。
- **中英双语界面**：跟随 DSH 语言设置，`zh` / `en` 两套文案。

### 安装

要求 DSH `^0.2.3-alpha.2`。

任选其一：

1. 在 DSH 会话里让 agent 执行 `plugin_manager` 的 `install_bundle`，`target` 传本目录的**绝对路径**；
2. GUI：**Plugins** → **Add plugin**，选择本目录。

装完如果浏览器半边没有热加载，刷新页面或重启 Desktop 即可。

### 数据与配置

分类和归属存在本插件的 volatile Config 里，由 DSH settings 服务写回当前 profile 的 Cordis patch，改完即时生效，不用重启插件：

```yaml
- id: workspace-category
  name: dsh-workspace-category
  config:
    categories:
      - { id: c_xxx, name: 工作 }
    assignments:
      <workspaceId>: c_xxx
```

- `categories`：分类数组，**数组顺序就是菜单和配置页的显示顺序**。
- `assignments`：工作区 id → 分类 id；没有条目的工作区属于「未分类」。
- 分类名 1–40 字符，不能重名，不能叫「全部工作区」或「未分类」。
- 当前筛选是**浏览器本地视图状态**，存在 `localStorage`（键 `dsh-workspace-category.active-filter.v1`），不跨浏览器、不跨设备同步。

### 兼容性与已知限制

「工作区」标题控件和工作区行过滤是对 DSH 内置 `ui-workspace` 现有 DOM 的**增量增强**，依赖以下结构：

- `[data-row-key="workspace:<id>"]` / `[data-row-key="session:<id>"]` / `[data-row-key="overflow:<id>"]`
- `sectionHeader` / `sectionLabel` 的 CSS Module 类名后缀
- 各语言的「工作区」标题文案（内置 zh / en / ja / es / fr / de / ru / pt 识别）

这**不是公开 API**。DSH 升级改动这些结构时，插件会隐藏自己的控件、停止过滤，但不会替换或破坏原工作区浏览器——宁可失效，不搞坏侧栏。另外：

- 扁平会话模式（标题为「会话」）、搜索展开、侧栏收起时，控件自动隐藏；切回工作区分组后，之前的筛选恢复。
- 筛选只影响侧栏显示，不改动工作区、会话本身，也不影响 agent 能访问什么。
- 纯本地插件，不发网络请求，不采集任何数据。

### 许可证

[MIT](./LICENSE)

---

## English

### Features

- **Category menu**: a chevron appears on the right of the sidebar's **Workspaces** header. Categories are listed in their configured order, **Uncategorized is always last**, and "All workspaces" sits on top to clear the filter. Arrow keys, Enter, and Esc work in the menu.
- **Filter by category**: picking a category turns the header into the category name in the theme accent, and hides every workspace outside that category **together with its sessions**.
- **Assign from a workspace**: a workspace row's **…** menu gains **Category settings**, a dialog where you can change the category or create a new one on the spot.
- **Plugin configuration page**: the plugin's row under **Plugins** → **Configure**. Add a category, rename it, delete it (the dialog tells you how many workspaces fall back to Uncategorized), and move categories up or down.
- **Localized UI**: `zh` and `en` strings follow the DSH language setting.

### Install

Requires DSH `^0.2.3-alpha.2`.

Either:

1. In a DSH session, run `plugin_manager` `install_bundle` with the **absolute path** of this directory as `target`;
2. Or use the GUI: **Plugins** → **Add plugin**, then pick this directory.

If the browser half is not hot-loaded after installing, refresh the page or restart Desktop.

### Data and configuration

Categories and assignments live in this plugin's volatile Config: the DSH settings service persists them into the active profile's Cordis patch, so edits apply immediately without restarting the plugin.

```yaml
- id: workspace-category
  name: dsh-workspace-category
  config:
    categories:
      - { id: c_xxx, name: 工作 }
    assignments:
      <workspaceId>: c_xxx
```

- `categories`: the category list; **array order is the display order** in both the menu and the configuration page.
- `assignments`: workspace id → category id. A workspace without an entry is Uncategorized.
- Category names are 1–40 characters, must be unique, and cannot be "All workspaces" or "Uncategorized".
- The active filter is **per-browser view state** in `localStorage` (key `dsh-workspace-category.active-filter.v1`). It is not synced across browsers or devices.

### Compatibility and limitations

Both the header control and the row filtering are **incremental enhancements over the DOM** that DSH's bundled `ui-workspace` already renders. They depend on:

- `[data-row-key="workspace:<id>"]` / `[data-row-key="session:<id>"]` / `[data-row-key="overflow:<id>"]`
- the `sectionHeader` / `sectionLabel` CSS Module class suffixes
- the localized "Workspaces" header text (recognized in zh, en, ja, es, fr, de, ru, pt)

This is **not a public API**. When a DSH upgrade changes that structure, the plugin hides its own control and stops filtering instead of replacing or breaking the original workspace browser — it fails degraded rather than damaging the sidebar. Also note:

- The control hides itself in flat session mode (header reads "Sessions"), while search results are expanded, and when the sidebar is collapsed; the previous filter comes back once workspaces are grouped again.
- Filtering only affects what the sidebar shows. It does not modify workspaces or sessions, and it does not change what an agent can reach.
- Fully local plugin: no network requests, no data collection.

### License

[MIT](./LICENSE)
