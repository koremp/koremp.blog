---
layout  : wiki
title   : Vim, NeoVim 적응기
summary : 
date    : 2023-09-13 18:04:01 +0900
updated : 2023-09-13 18:16:50 +0900
tag     : vim 
resource: 1A/3EB976-E9B0-4F3D-A901-688B39A7EB61
toc     : true
public  : true
parent  : vim
latex   : false
---
* TOC
{:toc}

# Vim, NeoVim 적응기

Practical Vim 읽었음

## JohnGrib 님 설정 따라하기

github.com/johngrib/dotfiles 의 nvim, _vimrc 갖고오기

nvim 설정 중 init.vim의 내용 중 config/nvim/config 위치를 ~/.config/nvim/config 으로 변경하기

### coc-settings을 일부 변경

내 github.io 블로그를https://github.com/johngrib/johngrib-jekyll-skeleton 을 따라하기

ruby 2.7.4를 m1에 다운로드하는 방법을 아직 찾지 못해서, jekyll serve 구축은 못했다.
README.md 를 읽을 때 coc-settings의 johngrib-wiki / johngrib-wiki-lsp의 위치를 찾지 못했다.
johngrib-wiki-lsp 레포지토리를 클론 후 npm install,  npm link를 통해 johngrib-wiki-lsp 커맨드를 등록.

### nvim

init.vim 에서 :PlugInstall 하기
언어 자동완성 - :CocInstall coc.nvim/Language-servers에서 원하는 언어의 서버를 다운로드
나는 js/ts, CSS, HTML, Markdown, Python, json, 을 다운로드

### johngrib-jekyll-sekeleton

일부 설정 변경하기

- 이메일, 블로그 주소, 썸네일? 변경
- about.md, robots.txt, package.json, giscus.json, about.md, 404.html의 fallbackRouter 변경
- _ config.yml 변경
- [ ] vimwiki 설정이 필요(plugin)
- [ ] ruby 2.7.8이 m1 air에 설치가 안되고 ubuntu 22.04에서도 안된다. (rvm architecture issue) 그래서 wsl2, ubuntu, windows terminal으로 사용한다.

### 다시 처음으로

다른 분들의 `init.vim`, `.vimrc` 파일을 참고해서 따라가려고 했는데, 플러그인이나 단축키를 내가 설정한 것이 아니고, 내가 vim의 기능을 완전히 쓰지 못한다고 생각했다. practical vim을 다시 읽었다. windows, buffer 등의 기능을 다시 보고 실무에서 쓰면서 활용하려고 한다.
