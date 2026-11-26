import Schema from '@deepseek-ai/schemastery';

/**
 * Workspace categories live in the plugin's own volatile configuration so the
 * DSH settings service can persist them to the active profile and the browser
 * half can read and edit them through `ctx.configForms` without a restart.
 *
 * `categories` is the display order used by the sidebar menu and the settings
 * page. `assignments` maps a Workspace id to one of those category ids; a
 * Workspace with no entry is "uncategorized".
 */
export const Config = Schema.object({
  categories: Schema.array(
    Schema.object({
      id: Schema.string().required(),
      name: Schema.string().min(1).max(40).required(),
    }),
  )
    .default([])
    .description('工作区分类，按数组顺序显示；未分类是虚拟分类，不写入这里。'),
  assignments: Schema.dict(Schema.string())
    .default({})
    .description('工作区 id → 分类 id；没有条目的工作区属于未分类。'),
}).volatile();

/**
 * The Host half owns no business state. It only marks this plugin as providing
 * its own configuration presentation, so Settings does not try to render a
 * generic form for it.
 *
 * @param {import('@deepseek-ai/cordis').Context} ctx
 */
export function apply(ctx) {
  ctx.inject(['settings'], (settingsCtx) => {
    settingsCtx.effect(
      () => settingsCtx.settings.configure({ auto: false }, ctx.fiber),
      'workspace-category: settings presentation',
    );
  });
}
