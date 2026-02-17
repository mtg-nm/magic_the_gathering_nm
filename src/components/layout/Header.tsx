'use client';

interface HeaderProps {
  navigation: any[];
  normalizedSlug: string;
}

export function Header({ navigation, normalizedSlug }: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left" style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/logomtgnm.png" 
              alt="NM Magic 2026 Logo" 
              className="logo-small"
            />
            <div className="header-title" style={{ marginLeft: '15px' }}>
              <h1>NM Magic 2026</h1>
              <p>Norgesmesterskapet i Magic: The Gathering</p>
            </div>
          </div>
          <nav className="nav-menu">
            {Array.isArray(navigation) &&
              navigation.map((item: any) => {
                const href = item.fields?.url || item.fields?.slug || '/';
                const itemSlug = item.fields?.slug?.toLowerCase().trim() || '';
                const isActive = normalizedSlug === itemSlug;

                return (
                  <a
                    key={item.sys.id}
                    href={href}
                    target={item.fields?.isExternal ? '_blank' : undefined}
                    className={isActive ? 'active' : ''}
                  >
                    {String(item.fields?.label || item.fields?.title || 'Link')}
                  </a>
                );
              })}
          </nav>
        </div>
      </div>
    </header>
  );
}