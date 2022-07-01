/* eslint-disable react-hooks/exhaustive-deps */
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { Box, Card, Hidden, MenuItem, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { debounce } from '@mui/material/utils';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react'; // styled components
import { getProductSearch } from 'utils/api/layout-apis/layoutsAPI';
import BazarButton from 'components/BazarButton';
import { useRouter } from 'next/router';
// also used in the GrocerySearchBox component

export const SearchOutlinedIcon = styled(SearchOutlined)(({ theme }) => ({
  color: theme.palette.grey[600],
  marginRight: 6,
})); // also used in the GrocerySearchBox component

export const SearchResultCard = styled(Card)(() => ({
  position: 'absolute',
  top: '100%',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  width: '100%',
  zIndex: 99,
}));

const SearchBox = () => {
  const [resultList, setResultList] = useState([]);
  const [searchKey, setSearchKey] = useState();
  const parentRef = useRef();
  const router = useRouter();

  const search = debounce((e) => {
    const value = e.target?.value;
    setSearchKey(value);
    if (!value) setResultList([]);
    else {
      const res = getProductSearch(value);
      res
        .then((data) => {
          setResultList(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, 200);
  const hanldeSearch = useCallback((event) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => {
    setResultList([]);
  };

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick);
    return () => {
      window.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const hadleSearchPage = () => {
    if (searchKey) {
      router.push(`/product/search/${searchKey}`);
    }
  };
  const focusFun = () => {
    document.body.style.overflow = 'hidden';
  };
  const blurFun = () => {
    document.body.style.overflow = 'auto';
  };
  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{
        ref: parentRef,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Searching for..."
        fullWidth
        onChange={hanldeSearch}
        autoComplete="off"
        onFocus={() => focusFun()}
        onBlur={() => blurFun()}
        InputProps={{
          sx: {
            height: 44,
            borderRadius: 300,
            paddingRight: 0,
            color: 'grey.700',
            overflow: 'hidden',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          },
          endAdornment: (
            <BazarButton
              color="secondary"
              variant="contained"
              disableElevation
              sx={{
                px: '3rem',
                height: '100%',
                borderRadius: '0 300px 300px 0',
              }}
              onClick={hadleSearchPage}
            >
              Search
            </BazarButton>
          ),
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />

      {!!resultList.length && (
        <SearchResultCard elevation={2}>
          {resultList.map((item, ind) => (
            <Link
              href={{
                pathname: `/product/${item.id}`,
                query: {
                  brnd: JSON.stringify({
                    branName: item.brand_name,
                    brandId: item.brand_id,
                  }),
                },
              }}
              key={ind}
              passHref
            >
              <MenuItem key={item}>{item.title}</MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )}
    </Box>
  );
};

export default SearchBox;
