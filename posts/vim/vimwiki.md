# vimwiki

## install

```vimrc
" Vim-plug
" :so %, :PlugInstall
Plug 'vimwiki/vimwiki', {branch: dev}


" Vundle
" :so %, :PluginInstall
Plugin 'vimwiki/vimwiki'
```

## vimwiki setup

```rc
" personal choice
let maplocalleader = "\\"

" path, ext, diary_rel_path

let g:vimwiki_list = [
    {
        path: '~/repos/github/user-name/vim-wiki-repo/_wiki',
        ext: '.md',
        diary_rel_path: '.',
    },
]

" preference - vimwiki-conceallevel disable
let g:vimwiki_conceallevel = 0


" 자주 사용하는 vimwiki 명령어에 단축키를 취향대로 매핑해둔다
command! WikiIndex :VimwikiIndex
nmap <LocalLeader>ww <Plug>VimwikiIndex
nmap <LocalLeader>wi <Plug>VimwikiDiaryIndex
nmap <LocalLeader>w<LocalLeader>w <Plug>VimwikiMakeDiaryNote
nmap <LocalLeader>wt :VimwikiTable<CR>

" F4 키를 누르면 커서가 놓인 단어를 위키에서 검색한다.
nnoremap <F4> :execute "VWS /" . expand("<cword>") . "/" <Bar> :lopen<CR>

" Shift F4 키를 누르면 현재 문서를 링크한 모든 문서를 검색한다
nnoremap <S-F4> :execute "VWB" <Bar> :lopen<CR>
```

## references

<https://johngrib.github.io/wiki/vim/vimwiki>



