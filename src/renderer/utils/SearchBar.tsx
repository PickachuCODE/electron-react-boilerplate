import { useTheme } from 'context/ThemeContext';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-akar-icons/search';

function SearchBar(props: any) {
  const { theme }: any = useTheme();
  const style = {
    searchBox: {
      background: theme.color.primary_100,
    },
    searchText: {
      color: theme.text.color,
    },
  };
  return (
    <div className="searchBarWrap" style={style.searchBox}>
      <input
        className={props.class}
        type="text"
        name="HubSearchBar"
        placeholder="Search in project"
        id="HubSearchBar"
        style={style.searchText}
      />
      <div className="iconbox">
        <Icon icon={searchIcon} color="white" width="20"/>
      </div>
    </div>
  );
}

export default SearchBar;
