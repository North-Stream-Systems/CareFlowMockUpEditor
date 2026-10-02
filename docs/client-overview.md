# Client Overview — how it should work

The first tab on every client profile is an **Overview** made of widgets. The organisation decides
what's on it, once, and that layout applies to **every client**. Each widget shows information that
staff record in **forms**, so the Overview always reflects real, up-to-date client data.

Try it in the prototype: Clients › Settings › **Client overview** and › **Forms**, then open any client.

## Concepts

**Form** — an org-defined set of questions completed for a client (Forms tab on the client profile).
- *Single record* (e.g. Client Details, Medical Summary): one current answer set; each save creates a new
  version, older versions kept for audit.
- *Repeating* (e.g. Risk Assessment, Daily Wellbeing): a new entry each time; history is listed newest first.
- *Built-in* forms/fields ship with CareFlow and are used by other modules, so they can't be deleted.
  Orgs can still add questions to them, and can create fully custom forms.
- Field types: short text, long text, number (optional unit), date, yes/no, dropdown, checkboxes, phone.

**Widget** — one block on the Overview. Four types:
| Type | Shows | Configured with |
|---|---|---|
| Form fields | Selected fields from a form's latest record | form, fields, width |
| Latest form entry | Most recent 1/3/5 entries of a form, with who & when | form, fields, entries, width |
| Status alert | A coloured banner **only when a rule matches** for that client | form, field, operator, value, colour, message |
| Built-in | Live data from other modules (visits, incidents, tasks, MAR, notes, KPIs, service summary) | width |

**Layout** — ordered list of widgets. Alerts always render as banners at the top; other widgets flow
through a 3-column grid (width = 1–3 columns). Admins add, configure, drag to reorder, resize and remove
widgets with a live preview against any real client.

**Alert rules** evaluate a field on the form's latest record. Operators: is, is not, contains, has any value,
is empty / not recorded, greater/less than (numbers), is in the past, is due within N days (dates).
A form never completed counts as empty — so "No risk assessment on file" is just `next_review is empty`.
Messages can include `{value}` and `{label}`.

**Starter templates** — Setup wizard step 8 offers Standard domiciliary / Clinical focus / Minimal.
Choosing one sets the layout; everything stays editable afterwards.

## Data model (suggested)

```
Form        { id, orgId, name, icon, description, repeatable, system, fields: Field[] }
Field       { id, label, type, options?, unit?, required, system }
Submission  { id, clientId, formId, formVersion, values: { [fieldId]: any }, submittedAt, submittedBy }
OverviewLayout { orgId, widgets: Widget[] }
Widget      { id, type: 'fields'|'latest'|'alert'|'builtin', title, size?,
              formId?, fieldIds?, entries?,                       // fields / latest
              fieldId?, op?, value?, tone?, message?,             // alert
              builtinId? }                                        // builtin
```

## Rules worth keeping
- Deleting a form also removes widgets that use it (the UI says how many before you confirm).
- Deleting a field leaves widgets intact; the field just stops appearing.
- Built-in forms/fields can't be deleted or have their type changed.
- Forms should be versioned so old submissions still render after questions change.
- Permissions (not in the prototype): only admins edit forms/layout; carers complete forms.
