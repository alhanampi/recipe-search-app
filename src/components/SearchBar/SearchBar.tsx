import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';
import { Form, Input, SearchButton, Wrapper } from './SearchBar.styled';

const SearchBar = ({ onSubmit, hideOnMobile, compact }: { onSubmit?: () => void; hideOnMobile?: boolean; compact?: boolean } = {}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search/${encodeURIComponent(trimmed)}`);
    onSubmit?.();
  };

  return (
    <Wrapper $hideOnMobile={hideOnMobile} $compact={compact}>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search.placeholder')}
        />
        <SearchButton type="submit" aria-label={t('search.button')}>
          <FaSearch />
        </SearchButton>
      </Form>
    </Wrapper>
  );
};

export default SearchBar;
