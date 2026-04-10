import { Link, useMatches } from 'react-router-dom';
import type { UIMatch } from 'react-router-dom';

type BreadcrumbHandle = {
  breadcrumb?: string | ((match: UIMatch) => string);
};

type MatchWithHandle = UIMatch & {
  handle?: BreadcrumbHandle;
};

const Breadcrumb = () => {
  const matches = useMatches() as MatchWithHandle[];

  const breadcrumbs = matches
    .filter((m) => m.handle?.breadcrumb)
    .map((m) => {
      const breadcrumb = m.handle!.breadcrumb!;

      return {
        name:
          typeof breadcrumb === 'function'
            ? breadcrumb(m)
            : breadcrumb,
        path: m.pathname,
      };
    });

  return (
    <nav className="flex items-center text-sm p-3 space-x-1">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={item.path} className="flex items-center space-x-1">
            {index !== 0 && <span>/</span>}

            {isLast ? (
              <span className="font-semibold text-gray-900">
                {item.name}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-violet-500"
              >
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;