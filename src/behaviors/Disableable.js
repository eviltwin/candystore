/*global dessert, troop, sntls, evan, shoeshine, candystore */
troop.postpone(candystore, 'Disableable', function () {
    "use strict";

    var base = troop.Base,
        self = base.extend();

    /**
     * The Disableable trait endows Renderable classes with an enabled - disabled state.
     * A Disableable may be disabled by multiple sources. All such sources have to
     * re-enable the host to be fully enabled again.
     * Expects to be added to a host that also has the Renderable trait.
     * @class
     * @extends troop.Base
     * @extends candystore.BinaryStateful
     * @extends shoeshine.Renderable
     */
    candystore.Disableable = self
        .addConstants(/** @lends candystore.Disableable */{
            /** @constant */
            LAYER_NAME_DISABLEBABLE: 'disableable'
        })
        .addPrivateMethods(/** @lends candystore.Disableable# */{
            /** @private */
            _updateEnabledStyle: function () {
                if (this.isDisabled()) {
                    this.removeCssClass('widget-enabled')
                        .addCssClass('widget-disabled');
                } else {
                    this.removeCssClass('widget-disabled')
                        .addCssClass('widget-enabled');
                }
            }
        })
        .addMethods(/** @lends candystore.Disableable# */{
            /** Call from host's .init. */
            init: function () {
                this.addStateLayer('disableable');
            },

            /**
             * Call from host's .afterEnableState
             */
            afterEnableState: function () {
                this._updateEnabledStyle();
            },

            /**
             * Call from host's .afterDisableState
             */
            afterDisableState: function () {
                this._updateEnabledStyle();
            },

            /**
             * Enables the instance by the specified source.
             * @param {string} disablingSource
             * @returns {candystore.Disableable}
             */
            enableBy: function (disablingSource) {
                this.disableState(this.LAYER_NAME_DISABLEBABLE, disablingSource);
                return this;
            },

            /**
             * Disables the instance by the specified source.
             * @param {string} disablingSource
             * @returns {candystore.Disableable}
             */
            disableBy: function (disablingSource) {
                this.enableState(this.LAYER_NAME_DISABLEBABLE, disablingSource);
                return this;
            },

            /**
             * Tells whether the current instance is currently disabled.
             * @returns {boolean}
             */
            isDisabled: function () {
                return this.getLayerState(this.LAYER_NAME_DISABLEBABLE);
            }
        });
});
