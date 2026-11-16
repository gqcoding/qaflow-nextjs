type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="eyebrow">{eyebrow}</div>
      <div className="page-title-row">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </header>
  );
}
