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
 * BKT Moulding Machine asset representing moulding equipment
 */
@Entity
public class BKTMouldingMachineAsset extends Asset<BKTMouldingMachineAsset> {

    public static final AssetDescriptor<BKTMouldingMachineAsset> DESCRIPTOR = new AssetDescriptor<>("img:bkt-moulding", "546E7A", BKTMouldingMachineAsset.class);

    public static final AttributeDescriptor<Double> TEMPERATURE = new AttributeDescriptor<>("temperature", ValueType.NUMBER,
        new MetaItem<>(MetaItemType.READ_ONLY)
    ).withUnits(UNITS_CELSIUS);

    public static final AttributeDescriptor<Double> PRESSURE = new AttributeDescriptor<>("pressure", ValueType.POSITIVE_NUMBER,
        new MetaItem<>(MetaItemType.READ_ONLY)
    ).withUnits(UNITS_BAR);

    public static final AttributeDescriptor<Integer> CYCLE_COUNT = new AttributeDescriptor<>("cycleCount", ValueType.POSITIVE_INTEGER,
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    public static final AttributeDescriptor<Boolean> STATUS = new AttributeDescriptor<>("status", ValueType.BOOLEAN,
        new MetaItem<>(MetaItemType.LABEL, "Running"),
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    /**
     * For use by hydrators (i.e. JPA/Jackson)
     */
    protected BKTMouldingMachineAsset() {
    }

    public BKTMouldingMachineAsset(String name) {
        super(name);
    }

    public Optional<Double> getTemperature() {
        return getAttributes().getValue(TEMPERATURE);
    }

    public Optional<Double> getPressure() {
        return getAttributes().getValue(PRESSURE);
    }

    public Optional<Integer> getCycleCount() {
        return getAttributes().getValue(CYCLE_COUNT);
    }

    public Optional<Boolean> getStatus() {
        return getAttributes().getValue(STATUS);
    }
}
