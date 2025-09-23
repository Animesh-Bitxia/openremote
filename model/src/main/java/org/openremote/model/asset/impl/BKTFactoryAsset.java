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
 * BKT Factory asset representing manufacturing facilities
 */
@Entity
public class BKTFactoryAsset extends Asset<BKTFactoryAsset> {

    public static final AssetDescriptor<BKTFactoryAsset> DESCRIPTOR = new AssetDescriptor<>("img:bkt-factory", "FF9800", BKTFactoryAsset.class);

    public static final AttributeDescriptor<Integer> PRODUCTION_RATE_PER_HOUR = new AttributeDescriptor<>("productionRate", ValueType.POSITIVE_INTEGER,
        new MetaItem<>(MetaItemType.LABEL, "Production Rate (/h)"),
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    public static final AttributeDescriptor<Double> ENERGY_CONSUMPTION_KWH = new AttributeDescriptor<>("energyConsumption", ValueType.POSITIVE_NUMBER,
        new MetaItem<>(MetaItemType.LABEL, "Energy (kWh)"),
        new MetaItem<>(MetaItemType.READ_ONLY)
    ).withUnits(UNITS_KILO, UNITS_WATT, UNITS_HOUR);

    public static final AttributeDescriptor<Integer> ACTIVE_LINES = new AttributeDescriptor<>("activeLines", ValueType.POSITIVE_INTEGER,
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    public static final AttributeDescriptor<Double> DOWNTIME_PERCENT = new AttributeDescriptor<>("downtime", ValueType.POSITIVE_NUMBER,
        new MetaItem<>(MetaItemType.LABEL, "Downtime (%)"),
        new MetaItem<>(MetaItemType.READ_ONLY)
    ).withUnits(UNITS_PERCENTAGE).withConstraints(new ValueConstraint.Min(0), new ValueConstraint.Max(100));

    /**
     * For use by hydrators (i.e. JPA/Jackson)
     */
    protected BKTFactoryAsset() {
    }

    public BKTFactoryAsset(String name) {
        super(name);
    }

    public Optional<Integer> getProductionRatePerHour() {
        return getAttributes().getValue(PRODUCTION_RATE_PER_HOUR);
    }

    public Optional<Double> getEnergyConsumptionKwh() {
        return getAttributes().getValue(ENERGY_CONSUMPTION_KWH);
    }

    public Optional<Integer> getActiveLines() {
        return getAttributes().getValue(ACTIVE_LINES);
    }

    public Optional<Double> getDowntimePercent() {
        return getAttributes().getValue(DOWNTIME_PERCENT);
    }
}
