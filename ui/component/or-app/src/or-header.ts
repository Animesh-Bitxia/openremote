import {css, html, LitElement, PropertyValues, TemplateResult, unsafeCSS} from "lit";
import {customElement, property, query, state} from "lit/decorators.js";
import manager, {
    DefaultBoxShadowBottom,
    DefaultColor1,
    DefaultColor2,
    DefaultColor3,
    DefaultColor4,
    DefaultColor5,
    DefaultHeaderHeight,
    Util,
  DEFAULT_LANGUAGES,
  Languages,
  HeaderSelected,
  HeaderTextColor
} from "@openremote/core";
import "@openremote/or-mwc-components/or-mwc-dialog";
import "@openremote/or-icon";
import {getContentWithMenuTemplate} from "@openremote/or-mwc-components/or-mwc-menu";
import {ListItem} from "@openremote/or-mwc-components/or-mwc-list";
import {Alarm, AlarmEvent, AlarmStatus, PersistenceEvent, Realm} from "@openremote/model";
import {AppStateKeyed, router, updateRealm} from "./index";
import {AnyAction, Store} from "@reduxjs/toolkit";
import * as Model from "@openremote/model";
import {i18next} from "@openremote/or-translate";

export {DEFAULT_LANGUAGES, Languages}

export interface HeaderConfig {
    mainMenu: HeaderItem[];
    secondaryMenu?: HeaderItem[];
}

export interface HeaderItem {
   icon: string;
   text: string;
   value?: string;
   href?: string;
   absolute?: boolean;
   action?: () => void;
   hideMobile?: boolean;
   roles?: string[] | {[client: string]: string[]} | (() => boolean);
}

function getHeaderMenuItems(items: HeaderItem[]): ListItem[] {
    return items.filter(hasRequiredRole).map((option) => {
        return {
            text: option.text,
            value: option.value ? option.value : "",
            icon: option.icon,
            href: option.href
        };
    });
}

function hasRequiredRole(option: HeaderItem): boolean {
    if (!option.roles) {
        return true;
    }

    if (Array.isArray(option.roles)) {
        return option.roles.some((r) => manager.hasRole(r));
    }

    if (Util.isFunction(option.roles)) {
        return (option.roles as () => boolean)();
    }

    return Object.entries(option.roles).some(([client, roles]) => roles.some((r: string) => manager.hasRole(r, client)));
}

function getCurrentMenuItemRef(defaultRef?: string): string | undefined {
    const menu = window.location.hash.substr(2).split("/")[0];
	return menu || defaultRef;
}

@customElement("or-header")
export class OrHeader extends LitElement {

    static get styles() {
        return css`
        
            :host {
                --internal-or-header-color: var(--or-header-color, var(--or-app-color1, ${unsafeCSS(DefaultColor1)}));    
                --internal-or-header-selected-color: ${unsafeCSS(HeaderSelected)};
                --internal-or-header-text-color: ${unsafeCSS(HeaderTextColor)};
                --internal-or-header-height: var(--or-header-height, ${unsafeCSS(DefaultHeaderHeight)});
                --internal-or-header-logo-margin: var(--or-header-logo-margin, 0 40px 0 0);
                --internal-or-header-logo-height: var(--internal-or-header-height, ${unsafeCSS(DefaultHeaderHeight)});
                --internal-or-header-item-size: var(--or-header-item-size, calc(${unsafeCSS(DefaultHeaderHeight)} - 20px));
                --internal-or-header-drawer-color: var(--or-header-drawer-color, var(--or-app-color2, ${unsafeCSS(DefaultColor2)}));
                --internal-or-header-drawer-text-color: var(--or-header-drawer-text-color, var(--or-app-color3, ${unsafeCSS(DefaultColor3)}));
                --internal-or-header-drawer-item-size: var(--or-header-drawer-item-size, 30px);
                --internal-or-header-drawer-separator-color: var(--or-header-drawer-separator-color, var(--or-app-color5, ${unsafeCSS(DefaultColor5)}));
                
                display: block;
                z-index: 4;
            }

            #sidebar-navigation-logo {
                width: 90%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 10px;
            }
              
            #toolbar-top {
                display: flex;
                flex-direction: column;
                padding: 0;
            }
            
            #logo-mobile {
                margin: 8px;
                height: calc(var(--internal-or-header-logo-height) - 16px);
                display: block;
            }
    
            #logo {
                display: none;
            }
                                            
            #header {
                opacity: 1;
                width: 100%;
                height: 100vh;
                text-align: center;
                background-color: var(--internal-or-header-color);
                color: var(--internal-or-header-text-color);
                --or-icon-fill: var(--internal-or-header-text-color);
                --or-icon-height: calc(var(--internal-or-header-item-size) - 12px);
                --or-icon-width: calc(var(--internal-or-header-item-size) - 12px);
                z-index: 9999999;
            }
    
            .shadow {
                -webkit-box-shadow: ${unsafeCSS(DefaultBoxShadowBottom)};
                -moz-box-shadow: ${unsafeCSS(DefaultBoxShadowBottom)};
                box-shadow: ${unsafeCSS(DefaultBoxShadowBottom)};
            }
                    
            #drawer {
                width: 100%;
                position: absolute;
                top: var(--internal-or-header-height);
                max-height: 0;
                height: calc(100% - var(--internal-or-header-height));
                transition: max-height 0.25s ease-out;
                background: var(--internal-or-header-drawer-color);
                color: var(--internal-or-header-drawer-text-color);
                --or-icon-fill: var(--internal-or-header-drawer-text-color);
                --or-icon-height: calc(var(--internal-or-header-drawer-item-size) - 10px);
                --or-icon-width: calc(var(--internal-or-header-drawer-item-size) - 10px);
                overflow: auto;
            }
            
            #drawer[opened] {
                max-height: 10000px;
                transition: max-height 0.75s ease-in;
            }
                            
            #drawer > div {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                padding: 10px 0px;
                position: relative;
            }
              
            .menu-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0 16px;
                height: 100%;
            }
            
            #menu-btn-mobile {
                display: flex;
                margin-left: auto;
                --or-icon-height: calc(var(--internal-or-header-item-size) - 8px);
                --or-icon-width: calc(var(--internal-or-header-item-size) - 8px);
            }

            #menu-btn-mobile #realm-picker > span{
                max-width: 70px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
    
            #menu-btn-desktop {
                display: none;
            }
            
            #desktop-right {
                margin-left: auto;
                padding-right: 10px;
                display: none;
            }
    
            .mobile-bottom-border {
                border-top: 1px solid var(--internal-or-header-drawer-separator-color);
                margin-top: 16px;
                padding-top: 8px;
            }
          
            .menu-item {
                cursor: pointer;
                text-decoration: none !important;         
                color: inherit;       
                margin-left: 10px;
                font-size: 14px;
                z-index: 1;
                text-align: left;
                margin-left: 20px;
                position: relative;
            }

            .menu-item::after {
                content: "";
                position: absolute;
                top: 0;
                left: -10px;
                width: calc(100% + 10px);
                height: 100%;
                border-radius: 8px 0 0 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: -1;
            }
            
            .menu-item:hover::after,
            .menu-item[selected] {
                opacity: 1;
            }

            .menu-item[selected] or-icon,
            .menu-item[selected] or-translate {
                color: white;
                transition: color 0.3s ease;
                font-size: 16px;
            }

            .menu-item or-translate {
                display: none;
                transition: display 0.3s ease;
            }

            #toolbar-list {
                height: calc(100vh - var(--internal-or-header-height));
                overflow-y: scroll;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }

            #toolbar-list::-webkit-scrollbar {
                display: none;
            }
                
            #desktop-left {
                display: flex;
                flex-direction: column;
                position: relative;
            }

            #desktop-left .menu-item or-icon {
                margin-right: 10px;
            }
            #desktop-left .menu-item  {
                line-height: calc(var(--internal-or-header-height) - 4px);
            }
            
            #desktop-right .menu-item  {
                line-height: var(--internal-or-header-height);
            }
            
            #drawer .menu-item  {
                display: block;
                line-height: var(--internal-or-header-drawer-item-size);
                margin: 6px 0;
                padding: 8px 16px;
            }
            
            #drawer .menu-item  or-icon {
                margin: 0 10px;
            }

            #desktop-left .menu-item[selected] {
                display: inline-block;
                line-height: var(--internal-or-header-height);
            }
    
            or-mwc-menu {
                margin-right: 10px;
                display: block;
            }
            
            .or-language-container {
                display: flex;
                height: 50px;
                align-items: center;
            }
          
            #realm-picker {
                position: relative;
                display: flex;
                height: 50px;
                align-items: center;
                cursor: pointer;
                margin-left: 10px;
            }
            
            #realm-picker > span {
                margin-right: 2px;
            }

            #menu-item-indicator-upper,
            #menu-item-indicator-lower,
            #menu-item-indicator {
                height: calc(var(--internal-or-header-height) - 4px) !important;
                width: calc(15rem - 10px) !important;
                position: absolute;
                margin-left: 10px;
                transition: all 0.3s ease;
                z-index: 0;
                background-color: var(--internal-or-header-selected-color);
            }

            #menu-item-indicator-upper {
                margin-top: calc(var(--internal-or-header-height) * -1 + 4px);
            }

            #menu-item-indicator-upper-inside,
            #menu-item-indicator-lower-inside,
            #menu-item-indicator-inside {
                background-color: white;
                width: 100%;
                height: 100%;
            }
                
            #menu-item-indicator-upper-inside {
                border-radius: 0 0 8px 0;
            }

            #menu-item-indicator-lower {
                margin-top: calc(var(--internal-or-header-height) - 4px);
            }
                
            #menu-item-indicator-lower-inside {
                border-radius: 0 8px 0 0;
            }

            #menu-item-indicator {
                background-color: white;
            }

            #menu-item-indicator-inside {
                background-color: var(--internal-or-header-selected-color);
                border-radius: 8px 0 0 8px;
            }

            #floating-alarm-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--or-app-color1, ${unsafeCSS(DefaultColor1)});
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: grab;
                z-index: 999999;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            }

            #floating-alarm-btn:active {
                cursor: grabbing;
            }

            #floating-alarm-btn or-icon {
                font-size: 28px;
            }

            #floating-nav-btn {
                position: fixed;
                top: 50%;
                right: -10px;
                left: auto;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(0,0,0,0.5);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: grab;
                z-index: 10000;
                transform: translateY(-50%);
                transition: transform 300ms ease, background 300ms ease;
                backdrop-filter: blur(6px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            }

            #floating-nav-btn.active {
                transform: translateY(-50%) rotate(225deg);
                background: rgba(0,0,0,0.65);
            }

            #nav-options {
                position: fixed;
                width: 0;
                height: 0;
                pointer-events: none;
                z-index: 9999;
            }

            #nav-options button {
                width: var(--option-size);
                height: var(--option-size);
                position: absolute;
                left: 0;
                top: 0;
                padding: 8px;
                border-radius: 50%;
                border: none;
                background: rgba(255, 255, 255, 0.8);
                backdrop-filter: blur(8px);
                color: black;
                cursor: pointer;
                transform: translate(-50%, -50%) translate(0px, 0px);
                opacity: 0;
                transition: transform 400ms cubic-bezier(.2,.9,.2,1), 
                            opacity 220ms linear,
                            box-shadow 0.3s ease,
                            filter 0.3s ease;
                pointer-events: none;

                /* default shadow */
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }

            /* Hover effect: scale + glow */
            #nav-options button:hover {
                transform: translate(-50%, -50%) translate(0px, 0px) scale(1.15);
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5), 0 0 10px rgba(38, 132, 37, 0.7);
                filter: brightness(1.1);
            }

            #nav-options.open {
                pointer-events: auto;
            }

            @media (max-width: 768px) {
                #sidebar-navigation-logo {
                    width: 100%;
                    margin: 10px 0;
                }

                #menu-item-indicator {
                    width: 3rem !important;
                    border-radius: 50%;
                }

                #menu-item-indicator-upper,
                #menu-item-indicator-lower {
                    display: none !important;
                }

                #menu-item-indicator {
                    width: 100% !important;
                    height: var(--internal-or-header-height) !important;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 0;
                }
                
                #menu-item-indicator-inside {
                    margin: 0 10px;
                    border-radius: 50%;
                    width: calc(100% - 20px) !important;
                }

                .menu-item {
                    margin-left: 0px;
                    text-align: center;
                }

                .menu-item or-icon {
                    margin-right: 0px !important;
                }
            }
          
            @media (min-width: 768px) {
                #menu-btn-desktop {
                    display: block;
                }          
    
                #menu-btn-mobile {
                    display: none;
                }
    
                #drawer {
                    display: none;
                }
                
                #desktop-right {
                    display: flex;
                }
                
                #desktop-left .menu-item {
                    display: inline-block;
                }
                
                .menu-item or-translate {
                    display: inline-block;
                }
    
                #desktop-left .menu-item[selected] {
                    line-height: calc(var(--internal-or-header-height) - 4px);
                }

                #logo {
                    height: var(--internal-or-header-logo-height);
                    display: block;
                }
    
                #logo-mobile {
                    display: none;
                }
                
                #desktop-left ::slotted(*) {
                    display: inline-block;
                }
    
                #desktop-left ::slotted(*[selected]) {                
                    border-bottom: 4px solid var(--internal-or-header-selected-color);
                    line-height: calc(var(--internal-or-header-height) - 4px);
                }
            }
    `;
    }

    @property({type: Array})
    public realms!: Realm[];

    @property({type: String})
    public realm!: string;

    @property({type: Object})
    public store!: Store<AppStateKeyed, AnyAction>;

    @property({type: String})
    public logo?: string;

    @property({ type: String })
    public logoMobile?: string;

    @property({ type: Object })
    public config?: HeaderConfig;

    @query("div[id=mobile-bottom]")
    protected _mobileBottomDiv!: HTMLDivElement;

    @property()
    public activeMenu: string | undefined;

    @state()
    private _drawerOpened = false;

    @state()
    private alarmButton = 'bell-outline';

    @state()
    private alarmColor = '--or-app-color3, ${unsafeCSS(DefaultColor3)}';

    private _eventSubscriptionId?: string;

    private _navOpen = false;
    private _navIsPointerDown = false;
    private _navStartPointerY = 0;
    private _navStartCenterY = 0;
    private _navDragMoved = false;
    private _navRadius = 50;
    private _navStaggerMs = 40;
    private _navMinDragThreshold = 6;

    public _onRealmSelect(realm: string) {
        this.store.dispatch(updateRealm(realm));
    }

    protected shouldUpdate(changedProperties: PropertyValues): boolean {
        if (changedProperties.has("config")) {
            this.activeMenu = getCurrentMenuItemRef(this.config && this.config.mainMenu && this.config.mainMenu.length > 0 ? this.config.mainMenu[0].href : undefined);
        }
        if (changedProperties.has("realm")) {
            this._getAlarmButton();
        }
        return super.shouldUpdate(changedProperties);
    }

    connectedCallback() {
        super.connectedCallback();
        this._subscribeEvents();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._unsubscribeEvents();
        window.removeEventListener('resize', this._boundSyncNav);
        window.removeEventListener('scroll', this._boundSyncNav);
    }

    protected async _subscribeEvents() {
        if (manager.events) {
            this._eventSubscriptionId = await manager.events.subscribe<AlarmEvent>({
                eventType: "alarm"
            }, (ev) => this._getAlarmButton());
        }
    }

    protected _unsubscribeEvents() {
        if (this._eventSubscriptionId) {
            manager.events!.unsubscribe(this._eventSubscriptionId);
            this._eventSubscriptionId = undefined;
        }
    }

    protected updated(changedProperties: PropertyValues) {
        super.updated(changedProperties);

        if (changedProperties.has("activeMenu")) {
            this._moveIndicator();
        }
    }

    private _moveIndicator() {
        const container = this.renderRoot.querySelector("#desktop-left") as HTMLElement;
        const indicator = this.renderRoot.querySelector("#menu-item-indicator") as HTMLElement;
        const indicatorUpper = this.renderRoot.querySelector("#menu-item-indicator-upper") as HTMLElement;
        const indicatorLower = this.renderRoot.querySelector("#menu-item-indicator-lower") as HTMLElement;
        const selected = container?.querySelector<HTMLElement>(`.menu-item[selected]`);

        if (indicator && indicatorUpper && indicatorLower) {
            if (selected) {
                indicator.style.display = "block";
                indicatorUpper.style.display = "block";
                indicatorLower.style.display = "block";

                const rect = selected.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                indicator.style.top = `${rect.top - containerRect.top}px`;
                indicator.style.height = `${rect.height}px`;
                indicator.style.width = `${rect.width}px`;

                indicatorUpper.style.top = `${rect.top - containerRect.top}px`;
                indicatorUpper.style.height = `${rect.height}px`;
                indicatorUpper.style.width = `${rect.width}px`;

                indicatorLower.style.top = `${rect.top - containerRect.top}px`;
                indicatorLower.style.height = `${rect.height}px`;
                indicatorLower.style.width = `${rect.width}px`;
            } else {
                indicator.style.display = "none";
                indicatorUpper.style.display = "none";
                indicatorLower.style.display = "none";
            }
        }
    }

    private _dragging = false;
    private _dragStartX = 0;
    private _dragStartY = 0;
    private _offsetX = 0;
    private _offsetY = 0;

    private _boundSyncNav = this._syncNavOptionsContainerToButton.bind(this);

    private _startDrag(e: MouseEvent | TouchEvent) {
        e.preventDefault();

        const startX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const startY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

        this._dragging = false;
        this._dragStartX = startX;
        this._dragStartY = startY;

        const moveHandler = (ev: MouseEvent | TouchEvent) => {
            const currentX = ev instanceof MouseEvent ? ev.clientX : ev.touches[0].clientX;
            const currentY = ev instanceof MouseEvent ? ev.clientY : ev.touches[0].clientY;

            const dx = currentX - this._dragStartX;
            const dy = currentY - this._dragStartY;

            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                this._dragging = true;
                const btn = this.renderRoot.querySelector("#floating-alarm-btn") as HTMLElement;
                if (btn) {
                    btn.style.transform = `translate(${this._offsetX + dx}px, ${this._offsetY + dy}px)`;
                }
            }
        };

        const endHandler = (ev: MouseEvent | TouchEvent) => {
            document.removeEventListener("mousemove", moveHandler);
            document.removeEventListener("mouseup", endHandler);
            document.removeEventListener("touchmove", moveHandler);
            document.removeEventListener("touchend", endHandler);

            if (this._dragging) {
                this._offsetX += (e instanceof MouseEvent ? (ev as MouseEvent).clientX : (ev as TouchEvent).changedTouches[0].clientX) - this._dragStartX;
                this._offsetY += (e instanceof MouseEvent ? (ev as MouseEvent).clientY : (ev as TouchEvent).changedTouches[0].clientY) - this._dragStartY;
            } else {
                router.navigate("alarms");
            }
        };

        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("mouseup", endHandler);
        document.addEventListener("touchmove", moveHandler);
        document.addEventListener("touchend", endHandler);
    }

    firstUpdated() {
        this._initNav();
    }

    private _initNav() {
        const navBtn = this.renderRoot.querySelector('#floating-nav-btn') as HTMLElement;
        if (navBtn) {
            const initialCenterY = window.innerHeight / 2;
            navBtn.style.top = `${Math.round(initialCenterY)}px`;
        }
        this._syncNavOptionsContainerToButton();
        this._animateNavOptions(false);
        window.addEventListener('resize', this._boundSyncNav);
        window.addEventListener('scroll', this._boundSyncNav);
    }

    private _syncNavOptionsContainerToButton() {
        const btn = this.renderRoot.querySelector("#floating-nav-btn") as HTMLElement;
        const opts = this.renderRoot.querySelector("#nav-options") as HTMLElement;
        if (!btn || !opts) return;
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        opts.style.left = `${Math.round(cx)}px`;
        opts.style.top = `${Math.round(cy)}px`;
    }

    private _computeNavOffsets(index: number, total: number) {
        const angle = Math.PI * (index / (total - 1));
        const x = -Math.sin(angle) * this._navRadius;
        const y = -Math.cos(angle) * this._navRadius;
        return { x, y };
    }

    private _animateNavOptions(open: boolean) {
        const opts = this.renderRoot.querySelector("#nav-options") as HTMLElement;
        const btns = Array.from(opts?.querySelectorAll('button') || []);
        if (open) {
            opts.classList.add('open');
            opts.setAttribute('aria-hidden', 'false');
        } else {
            opts.classList.remove('open');
            opts.setAttribute('aria-hidden', 'true');
        }
        btns.forEach((btn, i) => {
            const { x, y } = this._computeNavOffsets(i, btns.length);
            if (open) {
                (btn as HTMLElement).style.transitionDelay = `${i * this._navStaggerMs}ms`;
                (btn as HTMLElement).style.transform = `translate(-50%,-50%) translate(${x}px, ${y}px)`;
                (btn as HTMLElement).style.opacity = '1';
                (btn as HTMLElement).style.pointerEvents = 'auto';
            } else {
                (btn as HTMLElement).style.transitionDelay = `${(btns.length - 1 - i) * this._navStaggerMs}ms`;
                (btn as HTMLElement).style.transform = `translate(-50%,-50%) translate(0px, 0px)`;
                (btn as HTMLElement).style.opacity = '0';
                (btn as HTMLElement).style.pointerEvents = 'none';
            }
        });
    }

    private _onNavPointerDown(e: PointerEvent) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        e.preventDefault();
        const navBtn = this.renderRoot.querySelector('#floating-nav-btn') as HTMLElement;
        if (!navBtn) return;
        this._navIsPointerDown = true;
        navBtn.setPointerCapture?.(e.pointerId);
        const rect = navBtn.getBoundingClientRect();
        this._navStartCenterY = rect.top + rect.height / 2;
        this._navStartPointerY = e.clientY;
        this._navDragMoved = false;
        navBtn.style.cursor = 'grabbing';
        document.addEventListener('pointermove', this._boundOnNavPointerMove);
        document.addEventListener('pointerup', this._boundOnNavPointerUp);
    }

    private _boundOnNavPointerMove = (e: PointerEvent) => this._onNavPointerMove(e);
    private _boundOnNavPointerUp = (e: PointerEvent) => this._onNavPointerUp(e);

    private _onNavPointerMove(e: PointerEvent) {
        if (!this._navIsPointerDown) return;
        const dy = e.clientY - this._navStartPointerY;
        if (Math.abs(dy) > this._navMinDragThreshold) this._navDragMoved = true;
        const half = (this.renderRoot.querySelector('#floating-nav-btn') as HTMLElement).offsetHeight / 2;
        const newCenterY = Math.min(
            Math.max(this._navStartCenterY + dy, half),
            window.innerHeight - half
        );
        const navBtn = this.renderRoot.querySelector('#floating-nav-btn') as HTMLElement;
        if (navBtn) {
            navBtn.style.top = `${Math.round(newCenterY)}px`;
        }
        this._syncNavOptionsContainerToButton();
    }

    private _onNavPointerUp(e: PointerEvent) {
        if (!this._navIsPointerDown) return;
        this._navIsPointerDown = false;
        const navBtn = this.renderRoot.querySelector('#floating-nav-btn') as HTMLElement;
        navBtn?.releasePointerCapture?.(e.pointerId);
        if (navBtn) navBtn.style.cursor = 'grab';
        document.removeEventListener('pointermove', this._boundOnNavPointerMove);
        document.removeEventListener('pointerup', this._boundOnNavPointerUp);
        if (this._navOpen) this._syncNavOptionsContainerToButton();
    }

    private _onNavClick() {
        if (this._navDragMoved) {
            this._navDragMoved = false;
            return;
        }
        this._navOpen = !this._navOpen;
        const navBtn = this.renderRoot.querySelector('#floating-nav-btn') as HTMLElement;
        if (navBtn) navBtn.classList.toggle('active', this._navOpen);
        this._syncNavOptionsContainerToButton();
        this._animateNavOptions(this._navOpen);
    }

    protected render() {

        if (!this.config) {
            return html``;
        }

        const mainItems = this.config.mainMenu;
        const secondaryItems = this.config.secondaryMenu;

        return html`
           <!-- Header -->
            <div id="header" class="shadow">
                <div id="toolbar-top">
                    <div id="sidebar-navigation-logo"><img id="logo" src="${this.logo}" /><img id="logo-mobile" src="${this.logoMobile}" /></div>

                    <!-- This gets hidden on a small screen-->
                    <nav id="toolbar-list">
                        <div id="desktop-left">
                            <div id="menu-item-indicator-upper">
                                <div id="menu-item-indicator-upper-inside">
                                </div>
                            </div>
                            <div id="menu-item-indicator">
                                <div id="menu-item-indicator-inside">
                                </div>
                            </div>
                            <div id="menu-item-indicator-lower">
                                <div id="menu-item-indicator-lower-inside">
                                </div>
                            </div>
                            ${mainItems ? mainItems.filter(hasRequiredRole).map((headerItem) => {
                                return html`
                                    <a class="menu-item" data-href="${headerItem.href}" @click="${(e: MouseEvent) => this._onHeaderItemSelect(headerItem)}" ?selected="${this.activeMenu === headerItem.href}"><or-icon icon="${headerItem.icon}"></or-icon><or-translate value="${headerItem.text}"></or-translate></a>
                                `;
                            }) : ``}
                        </div>
                    </nav>
                    <div id="desktop-right">
                        <div id="alarm-btn">
                            <a class="menu-item" @click="${(e: MouseEvent) => router.navigate('alarms')}">
                                <or-icon icon="${this.alarmButton}" style="color:var(${this.alarmColor})" title="${i18next.t("alarm.alarm_plural")}"></or-icon>
                            </a>
                        </div>
                        ${this._getRealmMenu((value: string) => this._onRealmSelect(value))}
                        ${secondaryItems ? getContentWithMenuTemplate(html`
                            <button id="menu-btn-desktop" class="menu-btn" title="Menu"><or-icon icon="dots-vertical"></or-icon></button>
                        `,
                        getHeaderMenuItems(secondaryItems),
                        undefined,
                        (value) => this._onSecondaryMenuSelect(value as string)) : ``}
                    </div>
                    <div id="menu-btn-mobile">
                        ${this._getRealmMenu((value: string) => this._onRealmSelect(value))}
                        <button id="menu-btn" class="menu-btn" title="Menu" @click="${this._toggleDrawer}"><or-icon icon="${this._drawerOpened ? "close" : "menu"}"></or-icon></button>
                    </div>
                </div>
            </div>
            <div id="drawer" ?opened="${this._drawerOpened}" @click="${this._closeDrawer}">
                <div>                    
                    <div id="mobile-top">
                        <nav id="drawer-list">
                            ${mainItems ? mainItems.filter((option) => !option.hideMobile && hasRequiredRole(option)).map((headerItem) => {
                                return html`
                                    <a class="menu-item" @click="${(e: MouseEvent) => this._onHeaderItemSelect(headerItem)}" ?selected="${this.activeMenu === headerItem.href}"><or-icon icon="${headerItem.icon}"></or-icon><or-translate value="${headerItem.text}"></or-translate></a>
                                `;
                            }) : ``}
                        </nav>
                    </div>
                    
                    ${secondaryItems ? html`
                        <div id="mobile-bottom" class="${mainItems.length > 0 ? 'mobile-bottom-border' : ''}">
                            ${secondaryItems.filter((option) => !option.hideMobile && hasRequiredRole(option)).map((headerItem) => {
                                return html`
                                    <a class="menu-item" @click="${(e: MouseEvent) => this._onHeaderItemSelect(headerItem)}" ?selected="${this.activeMenu === headerItem.href}"><or-icon icon="${headerItem.icon}"></or-icon><or-translate value="${headerItem.text}"></or-translate></a>
                                `;
                            })}
                        </div>` : ``}
                </div>
            </div>

            <div id="floating-alarm-btn"
                @mousedown="${this._startDrag}"
                @touchstart="${this._startDrag}">
            <or-icon icon="${this.alarmButton}"
                    style="color:var(${this.alarmColor})"
                    title="${i18next.t("alarm.alarm_plural")}"></or-icon>
            </div>

            <div id="floating-nav-btn"
                 @pointerdown="${(e: PointerEvent) => this._onNavPointerDown(e)}"
                 @click="${() => this._onNavClick()}">
                <or-icon icon="plus"></or-icon>
            </div>

            <div id="nav-options" aria-hidden="true">
              <button @click="${() => { router.navigate('pageA'); this._onNavClick(); }}">A</button>
              <button @click="${() => { router.navigate('pageB'); this._onNavClick(); }}">B</button>
              <button @click="${() => { router.navigate('pageC'); this._onNavClick(); }}">C</button>
              <button @click="${() => { router.navigate('pageD'); this._onNavClick(); }}">D</button>
              <button @click="${() => { router.navigate('pageE'); this._onNavClick(); }}">E</button>
            </div>
        `;
    }

    protected _getRealmMenu(callback: (realm: string) => void): TemplateResult {

        const currentRealm = this.realms.find((t) => t.name === this.realm);

        let realmTemplate = html`
            <div id="realm-picker">
                ${this.realms.length > 1 ? html`
                    <span>${currentRealm ? currentRealm.displayName : ""}</span>
                    <or-icon icon="chevron-down"></or-icon>
                ` : ``}
            </div>
        `;

        if (manager.isSuperUser()) {
            const menuItems = this.realms.map((r) => {
                return {
                    text: r.displayName!,
                    value: r.name!
                } as ListItem;
            });

            realmTemplate = html`
                ${getContentWithMenuTemplate(
                        realmTemplate,
                        menuItems,
                        currentRealm ? currentRealm.name : undefined,
                        (value) => callback(value as string))}
            `;
        }

        return realmTemplate;
    }

    protected async _getAlarmButton() {
        let newAlarms = false;
        if (manager.hasRole("read:alarms") || manager.hasRole("read:admin")) {
            const response = await manager.rest.api.AlarmResource.getAlarms({realm: manager.displayRealm, status: Model.AlarmStatus.OPEN});
            newAlarms = response.data.length > 0;
        }
        this.alarmButton = newAlarms ? 'bell-badge-outline' : 'bell-outline';
        this.alarmColor = newAlarms ? '--or-app-color4, ${unsafeCSS(DefaultColor4)}' : '--or-app-color3, ${unsafeCSS(DefaultColor3)}';
    }

    protected _onSecondaryMenuSelect(value: string) {
        const headerItem = this.config!.secondaryMenu!.find((item) => item.value === value);
        if (headerItem) {
            this._onHeaderItemSelect(headerItem);
        }
    }

    protected _onHeaderItemSelect(headerItem: HeaderItem) {
        if (headerItem.action) {
            headerItem.action();
        } else if (headerItem.href) {
            if (headerItem.absolute) {
                window.location.href = headerItem.href;
            } else {
                router.navigate(headerItem.href);
            }
        }
    }

    protected _closeDrawer() {
        this._drawerOpened = false;
    }

    protected _toggleDrawer() {
        this._drawerOpened = !this._drawerOpened;
    }
}
