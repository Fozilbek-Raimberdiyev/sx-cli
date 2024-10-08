import { capitalizeFirstLetter } from '../../utils/formatter'
export function appVueContent(entities: { name: string; groupName: string }[]) {
    return `
    <template>
  <div class="flex overflow-hidden flex-col bg-white">
    <div class="w-full bg-slate-100 max-md:max-w-full">
      <div class="flex gap-5 max-md:flex-col">
        <aside class="flex flex-col w-[17%] max-md:ml-0 max-md:w-full h-screen max-md:h-auto overflow-y-auto bg-white">
          <div class="flex flex-col pt-6 pb-24 mx-auto w-full bg-white text-neutral-800 max-md:pb-24 px-4">
            <RouterLink to="/" class="self-start ml-10 text-xl font-extrabold text-blue-500">
              SX-CLI Platform
            </RouterLink>
            <div class="flex gap-4 px-10 py-3.5 mt-8 whitespace-nowrap bg-white bg-blend-normal max-md:px-5">
              <div class="text-2xl font-medium text-center"></div>
              <RouterLink to="/" class="grow shrink my-auto text-sm font-semibold tracking-wide w-[118px]">
                Dashboard
              </RouterLink>
            </div>
            <img loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e56e7d294124136ca70785c836a45649f130014acf518fa0a888ecd5fc898e2?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb"
              class="object-contain mt-4 w-full aspect-[250]" />
            <div class="self-start my-4 ml-10 text-xs font-bold tracking-wide bg-blend-normal max-md:ml-2.5 text-[#202224]">
              PAGES
            </div>
            ${
                entities.length
                    ? entities
                          .map((entity) => {
                              return `
                <RouterLink to="${entity.groupName}/${entity.name}" class="flex gap-4 px-10 py-2.5 whitespace-nowrap bg-white bg-blend-normal max-md:px-5 baseroute">
              <div class="text-2xl font-medium text-center"></div>
              <span class="grow shrink my-auto text-sm font-semibold tracking-wide w-[118px]">
                ${capitalizeFirstLetter(entity.name)}
              </span>
            </RouterLink>
                `
                          })
                          .join('')
                    : ''
            }
            
          </div>
        </aside>
        <div class="flex flex-col  w-[83%] max-md:ml-0 max-md:w-full gap-y-5 mr-5">
          <header class="flex flex-col w-full max-md:max-w-full">
            <div class="flex flex-wrap gap-5 justify-between px-5 py-3.5 w-full bg-white max-md:px-5 max-md:max-w-full">
              <div class="flex gap-6 my-auto text-center whitespace-nowrap text-neutral-800 max-md:max-w-full">
                <div class="grow my-auto text-2xl font-medium">
                  <button class="text-2xl font-medium">
                    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.75 0.5625H17.25V1.9375H0.75V0.5625ZM0.75 6.0625H17.25V7.4375H0.75V6.0625ZM0.75 11.5625H17.25V12.9375H0.75V11.5625Z"
                      fill="#202224" />
                  </svg>
                  </button>
                  
                </div>
                <div
                  class="flex flex-auto gap-3.5 px-4 py-2.5 text-sm rounded-2xl border border-solid bg-slate-100 border-neutral-300">
                  <img loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb0f3743a510c35621a02bd322d7f804e0ee3e71c34ce4b025391cfd374f5fe6?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb"
                    class="object-contain shrink-0 self-center bg-blend-normal aspect-square w-[18px]" />
                  <input class="flex-auto bg-blend-normal text-neutral-800 bg-inherit outline-none" placeholder="Search"/>
                </div>
              </div>
              <div class="flex gap-7">
                <div class="flex gap-3 my-auto text-sm font-semibold whitespace-nowrap text-stone-500">
                  <img loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/871cc1ba-1e36-4bca-a10e-23c5c88607c7?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/871cc1ba-1e36-4bca-a10e-23c5c88607c7?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/871cc1ba-1e36-4bca-a10e-23c5c88607c7?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/871cc1ba-1e36-4bca-a10e-23c5c88607c7?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/871cc1ba-1e36-4bca-a10e-23c5c88607c7?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/871cc1ba-1e36-4bca-a10e-23c5c88607c7?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/871cc1ba-1e36-4bca-a10e-23c5c88607c7?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/871cc1ba-1e36-4bca-a10e-23c5c88607c7?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb"
                    class="object-contain shrink-0 rounded-none aspect-[0.94] w-[30px]" /><img loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3daf12517b1da171c721fff3b84bdbfd0bbdb0051a41df873ad03cc67a93d06c?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3daf12517b1da171c721fff3b84bdbfd0bbdb0051a41df873ad03cc67a93d06c?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3daf12517b1da171c721fff3b84bdbfd0bbdb0051a41df873ad03cc67a93d06c?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3daf12517b1da171c721fff3b84bdbfd0bbdb0051a41df873ad03cc67a93d06c?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3daf12517b1da171c721fff3b84bdbfd0bbdb0051a41df873ad03cc67a93d06c?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3daf12517b1da171c721fff3b84bdbfd0bbdb0051a41df873ad03cc67a93d06c?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3daf12517b1da171c721fff3b84bdbfd0bbdb0051a41df873ad03cc67a93d06c?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3daf12517b1da171c721fff3b84bdbfd0bbdb0051a41df873ad03cc67a93d06c?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb"
                    class="object-contain shrink-0 self-start mt-1 w-10 rounded-none aspect-[1.48]" />
                  <div>English</div>
                  <img loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d627be2087cdc652b328cc9503dd54282389b810d9b8e94302fa12c882cefcab?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb"
                    class="object-contain shrink-0 my-auto w-2 aspect-[2]" />
                </div>
                <div class="flex gap-6 items-center">
                  <img loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8f76baf85d2cf7663bfdab8dec3cc141c32d427b75348d42df866b072bc88cf8?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f76baf85d2cf7663bfdab8dec3cc141c32d427b75348d42df866b072bc88cf8?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f76baf85d2cf7663bfdab8dec3cc141c32d427b75348d42df866b072bc88cf8?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f76baf85d2cf7663bfdab8dec3cc141c32d427b75348d42df866b072bc88cf8?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f76baf85d2cf7663bfdab8dec3cc141c32d427b75348d42df866b072bc88cf8?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f76baf85d2cf7663bfdab8dec3cc141c32d427b75348d42df866b072bc88cf8?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f76baf85d2cf7663bfdab8dec3cc141c32d427b75348d42df866b072bc88cf8?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f76baf85d2cf7663bfdab8dec3cc141c32d427b75348d42df866b072bc88cf8?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb"
                    class="object-contain shrink-0 self-stretch w-11 aspect-square" />
                  <div class="flex flex-col self-stretch my-auto">
                    <div class="text-sm font-bold text-neutral-700">
                      Moni Roy
                    </div>
                    <div class="self-start text-xs font-semibold text-neutral-600">
                      Admin
                    </div>
                  </div>
                  <img loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb27c29ce5981bc738c0ef0ec93db99e704cb0c0730470b035931ad6091f0482?placeholderIfAbsent=true&apiKey=5a20e5d461f34e4184f26423d378a9cb"
                    class="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]" />
                </div>
              </div>
            </div>
          </header>
          <main class="bg-white min-h-screen p-5">
            <RouterView></RouterView>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.baseroute {
color : #202224;
font-size: 14px;
}
.baseroute.router-link-active,.baseroute.router-link-exact-active {
    background-color: #4880FF;
    color: white;
font-style: normal;
font-weight: 600;
line-height: normal;
letter-spacing: 0.3px;
border-radius: 8px;
margin: 8px 0;
}
</style>
    `
}
