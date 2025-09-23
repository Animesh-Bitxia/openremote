/*
 * Copyright 2024, BKT Tyres
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package org.openremote.model.asset.impl;

import org.openremote.model.asset.Asset;
import org.openremote.model.asset.AssetDescriptor;
import org.openremote.model.attribute.MetaItem;
import org.openremote.model.value.AttributeDescriptor;
import org.openremote.model.value.MetaItemType;
import org.openremote.model.value.ValueConstraint;
import org.openremote.model.value.ValueType;

import jakarta.persistence.Entity;
import java.util.Optional;

import static org.openremote.model.Constants.*;

/**
 * BKT Solar asset representing solar plant / panels
 */
@Entity
public class BKTSolarAsset extends Asset<BKTSolarAsset> {

    public static final AssetDescriptor<BKTSolarAsset> DESCRIPTOR = new AssetDescriptor<>("img:bkt-solar", "FFB300", BKTSolarAsset.class);

    public static final AttributeDescriptor<Double> POWER_GENERATION = new AttributeDescriptor<>("power", ValueType.POSITIVE_NUMBER,
        new MetaItem<>(MetaItemType.LABEL, "Power (kW)"),
        new MetaItem<>(MetaItemType.READ_ONLY)
    ).withUnits(UNITS_KILO, UNITS_WATT);

    public static final AttributeDescriptor<Double> ENERGY_TODAY = new AttributeDescriptor<>("energyToday", ValueType.POSITIVE_NUMBER,
        new MetaItem<>(MetaItemType.LABEL, "Energy Today (kWh)"),
        new MetaItem<>(MetaItemType.READ_ONLY)
    ).withUnits(UNITS_KILO, UNITS_WATT, UNITS_HOUR);

    public static final AttributeDescriptor<Double> EFFICIENCY = new AttributeDescriptor<>("efficiency", ValueType.POSITIVE_NUMBER,
        new MetaItem<>(MetaItemType.READ_ONLY)
    ).withUnits(UNITS_PERCENTAGE).withConstraints(new ValueConstraint.Min(0), new ValueConstraint.Max(100));

    public static final AttributeDescriptor<Boolean> INVERTER_STATUS = new AttributeDescriptor<>("inverterStatus", ValueType.BOOLEAN,
        new MetaItem<>(MetaItemType.LABEL, "Inverter Online"),
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    /**
     * For use by hydrators (i.e. JPA/Jackson)
     */
    protected BKTSolarAsset() {
    }

    public BKTSolarAsset(String name) {
        super(name);
    }

    public Optional<Double> getPowerGeneration() {
        return getAttributes().getValue(POWER_GENERATION);
    }

    public Optional<Double> getEnergyToday() {
        return getAttributes().getValue(ENERGY_TODAY);
    }

    public Optional<Double> getEfficiency() {
        return getAttributes().getValue(EFFICIENCY);
    }

    public Optional<Boolean> getInverterStatus() {
        return getAttributes().getValue(INVERTER_STATUS);
    }
}
