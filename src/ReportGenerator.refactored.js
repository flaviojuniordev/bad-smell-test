const USER_VALUE_LIMIT = 500;
const ADMIN_PRIORITY_LIMIT = 1000;

export class ReportGenerator {
  constructor(database) {
    this.db = database;
  }

  generateReport(reportType, user, items) {
    let report = this.header(reportType, user);
    let total = 0;

    for (const item of items) {
      if (!this.isVisibleTo(user, item)) continue;

      this.markAdminPriority(user, item);
      if (reportType === 'CSV') {
        report += this.csvRow(user, item);
        total += item.value;
      } else if (reportType === 'HTML') {
        report += this.htmlRow(user, item);
        total += item.value;
      }
    }

    return (report + this.footer(reportType, total)).trim();
  }

  isVisibleTo(user, item) {
    return user.role === 'ADMIN' ||
      (user.role === 'USER' && item.value <= USER_VALUE_LIMIT);
  }

  markAdminPriority(user, item) {
    if (user.role === 'ADMIN' && item.value > ADMIN_PRIORITY_LIMIT) {
      item.priority = true;
    }
  }

  header(reportType, user) {
    if (reportType === 'CSV') return 'ID,NOME,VALOR,USUARIO\n';
    if (reportType !== 'HTML') return '';

    return '<html><body>\n' +
      '<h1>Relatório</h1>\n' +
      `<h2>Usuário: ${user.name}</h2>\n` +
      '<table>\n' +
      '<tr><th>ID</th><th>Nome</th><th>Valor</th></tr>\n';
  }

  csvRow(user, item) {
    return `${item.id},${item.name},${item.value},${user.name}\n`;
  }

  htmlRow(user, item) {
    const priority = user.role === 'ADMIN' && item.priority;
    const rowStart = priority ? '<tr style="font-weight:bold;">' : '<tr>';
    return `${rowStart}<td>${item.id}</td><td>${item.name}</td><td>${item.value}</td></tr>\n`;
  }

  footer(reportType, total) {
    if (reportType === 'CSV') return `\nTotal,,\n${total},,\n`;
    if (reportType === 'HTML') {
      return `</table>\n<h3>Total: ${total}</h3>\n</body></html>\n`;
    }
    return '';
  }
}
