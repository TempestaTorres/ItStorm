import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class SlickService {

  private apsisac_next_arrow = '<span class="slick-next slick-arrow" data-role="none" tabindex="0" role="button"><svg fill="currentColor" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z"/></svg></span>';
  private apsisac_prev_arrow = '<span class="slick-prev slick-arrow" data-role="none" tabindex="0" role="button"><svg fill="currentColor" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><path d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z"/></svg></span>';

  public slickMount(id: string): any {

    let slick: any = $('#'+id);

    if (slick) {

      let t: any = JSON.parse(slick.closest(".apsisac-slider-wrp").attr("data-conf"));

      if (t) {

        slick.slick({
          lazyLoad: t.lazyload,
          dots: "true" == t.dots,
          infinite: "true" == t.loop,
          arrows: "true" == t.arrows,
          speed: parseInt(t.speed),
          autoplay: "true" == t.autoplay,
          autoplaySpeed: parseInt(t.autoplay_interval),
          slidesToShow: parseInt(t.slides_column),
          slidesToScroll: parseInt(t.slides_scroll),
          centerMode: "true" == t.center_mode,
          centerPadding: 0,
          pauseOnHover: "true" == t.hover_pause,
          pauseOnFocus: "false" != t.focus_pause,
          fade: "true" == t.effect,
          rtl: "true" == t.rtl,
          nextArrow: this.apsisac_next_arrow,
          prevArrow: this.apsisac_prev_arrow,
          responsive: [{
            breakpoint: 1023,
            settings: {
              slidesToShow: 3 < parseInt(t.slides_column) ? 3 : parseInt(t.slides_column),
              slidesToScroll: 1
            }
          }, {
            breakpoint: 767,
            settings: {
              slidesToShow: 2 < parseInt(t.slides_column) ? 2 : parseInt(t.slides_column),
              slidesToScroll: 1
            }
          }, {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }, {
            breakpoint: 319,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        })
      }
    }

    return slick;
  }

  public slickTestimonialsMount(id: string): any {

    let slick: any = $('#'+id);

    if (slick) {

      let t: any = JSON.parse(slick.closest(".wtwp-slider-wrp").attr("data-conf"));

      if (t) {

        slick.slick({
          dots: "true" == t.dots,
          infinite: "true" == t.loop,
          arrows: "true" == t.arrows,
          speed: parseInt(t.speed),
          autoplay: "true" == t.autoplay,
          autoplaySpeed: parseInt(t.autoplay_interval),
          slidesToShow: parseInt(t.slides_column),
          slidesToScroll: parseInt(t.slides_scroll),
          centerMode: "true" == t.center_mode,
          centerPadding: 0,
          pauseOnHover: "true" == t.hover_pause,
          pauseOnFocus: "false" != t.focus_pause,
          fade: "true" == t.effect,
          rtl: "true" == t.rtl,
          responsive: [{
            breakpoint: 1023,
            settings: {
              slidesToShow: 3 < parseInt(t.slides_column) ? 3 : parseInt(t.slides_column),
              slidesToScroll: 1
            }
          }, {
            breakpoint: 767,
            settings: {
              slidesToShow: 2 < parseInt(t.slides_column) ? 2 : parseInt(t.slides_column),
              slidesToScroll: 1
            }
          }, {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }, {
            breakpoint: 319,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        })
      }
    }
    return slick;
  }

  // For apsisac-slick-variable
  public slickVariableMount(id: string): any {

    let slick: any = $('#'+id);

    if (slick) {

      let t: any = JSON.parse(slick.closest(".apsisac-slick-variable-wrp").attr("data-conf"));

      if (t) {

        slick.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: !0,
          centerPadding: "0px",
          lazyLoad: t.lazyload,
          speed: parseInt(t.speed),
          autoplaySpeed: parseInt(t.autoplay_interval),
          dots: "true" == t.dots,
          infinite: "true" == t.loop,
          arrows: "true" == t.arrows,
          autoplay: "true" == t.autoplay,
          pauseOnHover: "true" == t.hover_pause,
          pauseOnFocus: "false" != t.focus_pause,
          rtl: "true" == t.rtl,
          variableWidth: "true" == t.var_width,
          nextArrow: this.apsisac_next_arrow,
          prevArrow: this.apsisac_prev_arrow,
          responsive: [{
            breakpoint: 639,
            settings: {
              centerMode: !0,
              variableWidth: "true" == t.var_width
            }
          }, {
            breakpoint: 220,
            settings: {
              dots: !1,
              variableWidth: !1,
              centermode: !1
            }
          }]
        })
      }
    }

    return slick;
  }

  //For apsisac-slick-carousal-slider
  public slickCarouselMount(id: string): any {

    let slick: any = $('#'+id);

    if (slick) {

      let t: any = JSON.parse(slick.closest(".apsisac-slick-carousal-wrp").attr("data-conf"));

      if (t) {

        slick.slick({
          lazyLoad: t.lazyload,
          speed: parseInt(t.speed),
          autoplaySpeed: parseInt(t.autoplay_interval),
          slidesToShow: parseInt(t.slidestoshow),
          slidesToScroll: parseInt(t.slidestoscroll),
          centerPadding: parseInt(t.center_padding) + "px",
          dots: "true" == t.dots,
          infinite: "true" == t.loop,
          arrows: "true" == t.arrows,
          autoplay: "true" == t.autoplay,
          centerMode: "true" == t.centermode,
          pauseOnHover: "true" == t.hover_pause,
          pauseOnFocus: "false" != t.focus_pause,
          rtl: "true" == t.rtl,
          nextArrow: this.apsisac_next_arrow,
          prevArrow: this.apsisac_prev_arrow,
          responsive: [{
            breakpoint: 1023,
            settings: {
              slidesToShow: 3 < parseInt(t.slidestoshow) ? 3 : parseInt(t.slidestoshow),
              slidesToScroll: 3 < parseInt(t.slidestoscroll) ? 3 : parseInt(t.slidestoscroll)
            }
          }, {
            breakpoint: 639,
            settings: {
              slidesToShow: 2 < parseInt(t.slidestoshow) ? 2 : parseInt(t.slidestoshow),
              slidesToScroll: 2 < parseInt(t.slidestoscroll) ? 2 : parseInt(t.slidestoscroll),
              centerMode: !1
            }
          }, {
            breakpoint: 220,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: !1,
              centerMode: !1
            }
          }]
        })
      }
    }

    return slick;
  }

  public unslick(slick: any): void {
    if (slick) {
      slick.slick('unslick');
    }
  }
}
